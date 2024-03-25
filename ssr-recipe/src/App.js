import { Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import RedPage from "./pages/RedPage";
import Bluepage from "./pages/Bluepage";

function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage/>}/>
        <Route path="/blue" element={<Bluepage/>}/>
      </Routes>
    </div>
  );
}

export default App;