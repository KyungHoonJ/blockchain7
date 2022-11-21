// export default function FuncComp(props) {
//   const {text, func} = props
//   props.func();
//   return <div>FuncComp {props.text}</div>;
// }

import { useState } from "react";

export default function FuncComp({ text, func }) {
  const [test, setTest] = useState("state test"); // state 선언 및 정의(초기화)
  func();

  return (
    <div
      onClick={function () {
        setTest(test + "1"); // state 재정의
      }}
    >
      FuncComp {text} {test}
    </div>
  );
}
