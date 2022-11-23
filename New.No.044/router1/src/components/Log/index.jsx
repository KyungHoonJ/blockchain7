import { Route, Routes } from "react-router-dom";
import In from "./In";
import Out from "./Out";

function Log() {
  return (
    <div>
      Log!
      <Routes>
        <Route path="/in/:userId" element={<In />} />
        <Route path="/out" element={<Out />} />
      </Routes>
    </div>
  );
}

export default Log;
