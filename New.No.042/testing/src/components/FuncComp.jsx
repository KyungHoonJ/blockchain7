// export default function FuncComp(props) {
//   const {text, func} = props
//   props.func();
//   return <div>FuncComp {props.text}</div>;
// }

import { useState, useEffect } from "react";

export default function FuncComp({ text, func }) {
  const [test, setTest] = useState("state test"); // state 선언 및 정의(초기화)
  // state : 상태값, React에서의 리랜더링(다시 그리기)의 기준이 된다.
  // state가 변경(재정의)되면 컴포넌트를 다시 불러온다.
  // 단, 다시 불러올 때 Hook으로 된 변수, 함수들은 다시 부르지 않는다.(useState 등등)
  // useState는 함수형 컴포넌트의 투톱 중 하나다.
  const [study1] = useState("study1");
  func();

  useEffect(() => {
    // useEffect는 랜더링 후에 실행되는 콜백함수이다.
    console.log("useEffect");
    // 아래가 componentWillUnmount와 같다.
    return () => {
      console.log("componentWillUnmount");
    };
    // 빈배열의 useEffect에서 함수를 return 하면 componentWillUnmount와 같은 작동을 한다.
  }, []);
  // useEffect의 두번째 매개변수는 state 값의 배열을 넣는다.
  // 빈배열의 경우 componentDidMount와 같은 역활을 한다.
  // 즉, 마운트 됐을 때만 실행한다.
  // useEffect는 함수형 컴포넌트의 투톱 중 하나다.

  useEffect(() => {
    console.log("state change");
    // state 값이 변화했을 때 실행되는 메서드
  });

  useEffect(() => {
    console.log("test change");
    // state 중 test 값이 변화했을 때 실행되는 메서드
  }, [test]);

  useEffect(() => {
    console.log("study1 change");
    // state 중 study1 값이 변화했을 때 실행되는 메서드
  }, [study1]);
  // 두번째 매개변수 배열의 아이템으로 프로그래머가 감지하고 싶은 state(상태값)를 넣는다.
  // study1이 변경(재정의) 됐을 때만 실행된다.

  useEffect(() => {
    console.log("test || study1 change");
    // state 중 test 또는 study1 값이 변화했을 때 실행되는 메서드
  }, [test, study1]);

  return (
    <div
      onClick={function () {
        setTest(test + "1"); // state 재정의
      }}
    >
      FuncComp {text} {test} {study1}
    </div>
  );
}
