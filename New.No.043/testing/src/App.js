// React의 구조
// Component란? << 기능적으로 최소 단위
// - 기능을 포함하는 HTML 구조 단위
//   - 컴포넌트는 항상 HTML 구조를 return 해야한다.
//     - 함수형에서는 함수 자체가 return 한다.
//     - 클래스형에서는 render 메서드에서 return 한다.

import "./App.css";

function App() {
  let num = 1;
  let bool = true;
  let str = "문자열";
  let arr = [1, 2, 3, 4];
  let obj = { name: "객체" };
  let nul = null;
  let und = undefined;

  // console.log(if(){})
  // console.log(for(let i = 0; i< 10;i++){})
  // console.log(while(){})
  // '값을 내보낸다, 가져온다' 얘기할 수 있는 것들과 if, for, while의 차이가 무엇인가?
  // '값을 내보낸다, 가져온다' << 변수, 함수 << '수'이다.
  // if 조건문, for / while 반복문 << '문장'일 뿐이다.

  function testing() {
    return "함수 테스팅";
  }

  function increase() {
    num = num + 1;
    console.log(num);
  }

  return (
    <div className="App">
      {/* {}는 값을 가져야만 출력할 수 있다.
    단, Object의 경우엔 출력 방법이 모호하기 때문에 출력하지 못한다. */}
      <div onClick={increase}>{num}</div>
      <div>{bool}</div>
      <div>{str}</div>
      <div>{arr}</div>
      <div>{obj.name}</div>
      <div>{nul}</div>
      <div>{und}</div>

      <div>{bool ? "true" : "false"}</div>
      {/* 이거 왜 삼항연산자로 써요? if로 안되요? */}
      <div>{testing()}</div>
    </div>
  );
  // HTML 태그 내에서 {}를 사용하여 변수를 출력할 수 있다.
}

export default App;
