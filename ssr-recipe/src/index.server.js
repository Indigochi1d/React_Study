import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import path from "path";
import fs from "fs";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";
import PreloadContext from "./lib/PreloadContext";
import createSagaMiddleware from "redux-saga";
import { END } from "redux-saga";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";

const statsFile = path.resolve("./build/loadable-stats.json");
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

function createPage(root, tags) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset = "utf-8"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta 
        name = "viewport"
        content = "width=device-width, initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      ${tags.styles}
      ${tags.links}
      </head>
      <body>
        <noscript>
          You need to enable JS to run this app.
        </noscript>
        <div id = "root">${root}</div>
        ${tags.scripts}
        <script src=${manifest.files["main.js"]}></script>
      </body>
    </html> 
  `;
}

const app = express();

//SSR을 처리할 핸들러 함수
const serverRender = async (req, res, next) => {
  const context = {};
  const sagaMiddleWare = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, sagaMiddleWare)
  );
  const sagaPromise = sagaMiddleWare.run(rootSaga).toPromise();
  const preloadContext = {
    done: false,
    promises: [],
  };

  const extractor = new ChunkExtractor({ statsFile });

  const jsx = (
    <ChunkExtractorManager extractor={extractor}>
      <PreloadContext.Provider value={preloadContext}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </PreloadContext.Provider>
    </ChunkExtractorManager>
  );
  ReactDOMServer.renderToStaticMarkup(jsx); //초기 렌더링시에만 더 빠르게 하기 위해서 사용
  store.dispatch(END);
  try {
    await sagaPromise;
    await Promise.all(preloadContext.promises); //모든 Promise들을 기다림
  } catch (error) {
    return res.status(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx); // 렌더링을하고

  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`; //리덕스 초기상태를 스크립트로 주입

  const tags = {
    scripts: stateScript + extractor.getScriptTags(), //script앞부분에 리덕스 상태 넣기
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags(),
  };
  res.send(createPage(root, tags)); //클라이언트에게 결과물 응답
};

const serve = express.static(path.resolve("./build"), {
  index: false, // "/"경로에서 index.html을 보여주지 않도록 설정
});

app.use(serve); // 순서가 중요. serverRender 전에 위치해야함.
app.use(serverRender);

//port : 8080
app.listen(8080, () => {
  console.log("Running on http://localhost:8080");
});
