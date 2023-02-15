// import logo from "./logo.svg";
// import "./App.css";
import { Route, Routes, Link } from "react-router-dom";

import AddBoardContainer from "./containers/AddBoard";
import { BoardContainer } from "./containers/Board";
import RegistContainer from "./containers/Regist";

function App() {
  return (
    <div className="App">
      <div>
        <Link to={"/"}>Home</Link> | <Link to={"/new"}>new Board</Link> |{" "}
        <Link to={"/user/sign"}>Sign In</Link>
      </div>
      <Routes>
        <Route path="/" element={<BoardContainer />} />
        <Route path="/new" element={<AddBoardContainer />} />
        <Route path="/user/sign" element={<RegistContainer />} />
      </Routes>
    </div>
  );
}

export default App;
