import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Log from "./components/Log";
import In from "./components/Log/In";
import Out from "./components/Log/Out";

function App() {
  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* 라우터를 나누기 위해서는 Routes 컴포넌트로 묶어야한다. */}
        <Route path="" element={<Home propsNum={num} />} />
        {/* Route는 각 라우터에 대한 구현이다. path는 라우터의 주소, element는 출력할 엘리먼트(컴포넌트) */}
        <Route path="login" element={<LogIn />} />
        <Route path="log" element={<Log />}>
          <Route path="in" element={<In />} />
          <Route path="out" element={<Out />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
