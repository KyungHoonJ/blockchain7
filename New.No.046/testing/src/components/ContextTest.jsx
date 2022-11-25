// useContext << 라는 Hook을 사용한다.
// Context란 무엇인가? 전역 상태 관리 이다.
// React에서 사용하는 변수, 상태값들은 거의 대부분이 지역 변수, 상태값이다.
// 특히! 상태값은 무조건 지역 스코프에 포함되어 외부로 나갈 수 없다. >> 지역 변수와 같다.
// 전역 스코프에서 상태값을 쓰고싶다. => Context 라는 녀석이다.

import { useState, Component, useContext } from "react";
import { createContext } from "react";

const TestContext = createContext();
// 전역 변수를 저장할 공간을 생성한다.

export default function ContextTest() {
  const [num, setNum] = useState(12);
  return (
    <TestContext.Provider value={{ num, setNum }}>
      {/* 하위 컴포넌트 내에서 어디서든지 변수를 쓸 수 있도록 하기 위해 Provider 컴포넌트로 감싼다. */}
      {/* Provider 컴포넌트의 value props를 사용해 전역 변수로 사용할 데이터 값을 정의한다. */}
      <Child1 />
    </TestContext.Provider>
  );
}
function Child1({}) {
  return <Child2 />;
}
function Child2({}) {
  return <Child3 />;
}
function Child3({}) {
  const item = useContext(TestContext);
  return (
    <div
      onClick={() => {
        item.setNum(item.num - 1);
      }}
    >
      child3 {item.num}
      <Child4 />
    </div>
  );
}
function Child4({}) {
  return <Child5 />;
}
function Child5({}) {
  const item = useContext(TestContext);
  // Context를 가져오기 위해 useContext를 사용한다.
  // 매개변수로 생성한 Context를 전달한다.

  let count = (e) => {
    e.stopPropagation();
    item.setNum(item.num + 1);
  };

  return (
    <div onClick={count}>
      child5 {item.num}
      <Child6 />
    </div>
  );
}

class Child6 extends Component {
  render() {
    return (
      <TestContext.Consumer>
        {(item) => <div>Child6 {item.num}</div>}
      </TestContext.Consumer>
    );
  }
}
