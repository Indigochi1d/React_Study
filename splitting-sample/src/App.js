import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import { useState} from "react";
import loadable from '@loadable/component';

const SplitMe = loadable(()=>import('./SplitMe'),{
  fallback : <div>loading...</div>
});

function App() {
  const [visible,setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="loop" />
        <p onClick={onClick} onMouseOver={onMouseOver}>ㅎ2</p>
        {visible && <SplitMe/>}
      </header>
      
    </div>
  );
};

export default App;