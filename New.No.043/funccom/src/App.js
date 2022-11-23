import { useState } from "react";
import "./App.css";
import EffectTest from "./components/EffectTest";

// 함수형 컴포넌트는 생명주기가 약간은 다르다.
// 함수형 컴포넌트는 mount, update 시에 함수 자체를 다시 호출한다.
// 클래스형 컴포넌트의 state, lifecycle 메서드들을 사용하듯이 구현을 하려면 Hook 메서드들을 사용해야한다.
// Hook 메서드로는 useState, useEffect, useRef, useCallback, useMemo
//   - useContext, useReducer가 있지만 해당 내용은 Redux에서
// useEffect, useCallback, useMemo의 경우 상황에 따라 필요없는 코드를 실행시키지 않도록 하기 위해서 사용
function App() {
  console.log("app");
  // mount, update 시에 항상 app이 콘솔창에 출력된다.
  let num1 = 0;
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");

  const increase = () => {
    num1 = num1 + 1;
    setNum(num + 1);
    console.log(num1);
  };

  return (
    <div className="App">
      <div onClick={increase}>{num}</div>
      <div>
        <EffectTest />
      </div>
    </div>
  );
}

export default App;
