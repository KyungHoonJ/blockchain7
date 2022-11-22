// React의 구조
// Component란? << 기능적으로 최소 단위
// - 기능을 포함하는 HTML 구조 단위
//   - 컴포넌트는 항상 HTML 구조를 return 해야한다.
//     - 함수형에서는 함수 자체가 return 한다.
//     - 클래스형에서는 render 메서드에서 return 한다.
// 컴포넌트(root)
// - App
//   - UserBox
//     - Regist
//     - LogIn
//     (- LogOut)
//   - BoardBox

import React from "react";
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

  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

  let arrDiv = [
    <div key={0}>1</div>,
    <div key={1}>2</div>,
    <div key={2}>3</div>,
    <div key={3}>4</div>,
  ];

  function arrFunc(arr) {
    const tempArr = [];

    // for (let i = 0; i < arr.length; ++i) {
    //   tempArr.push(<div key={i}>{arr[i]}</div>);
    // }

    arr.forEach((item, index) => {
      tempArr.push(<div key={index}>{item}</div>);
    });

    return tempArr;
  }

  console.log(bool ? "true" : "false");

  return (
    <div className="App">
      {/* {}는 값을 가져야만 출력할 수 있다.
    단, Object의 경우엔 출력 방법이 모호하기 때문에 출력하지 못한다. */}
      <App1 />
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
      <div>
        {/* <div>{arr[0]}</div>
        <div>{arr[1]}</div>
        <div>{arr[2]}</div>
        <div>{arr[3]}</div> */}
        {arrDiv}
        {arrFunc(arr)}
        {arr.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
  // HTML 태그 내에서 {}를 사용하여 변수를 출력할 수 있다.
}

export default App;

class App1 extends React.Component {
  // 우리가 컴포넌트를 만들 때 컴포넌트의 모든 코드를 알고있나? << 모른다. 그렇기 때문에 상속을 받도록 한다.

  // 여기서 정의한 것은 this의 프로퍼티로 추가된다.
  // num = 0;
  constructor(props) {
    // 클래스를 생성할 때 실행되는 코드
    super(props);
    // 상속을 받았을 때 부모의 해당 메서드를 실행한다. << 부모의 constructor

    console.log("constructor");
    console.log(this);
    console.log(this.num);
    this.num = 0;
    this.state = { name: "상태값" };
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(this);
    console.log(this.state.name);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    console.log(this);
  }

  increaseFunc() {
    console.log(this);
    console.log(this.num);
    // 여기서의 this는 increaseFunc 메서드이다.
    // 호출하는 곳에서 bind 메서드로 this를 App1로 전달해야한다.
  }

  increase = () => {
    this.num = this.num + 1;
    console.log(this.num);
    // 여기서의 this는 App1이 된다.
    // 호출하는 곳에서 bind 메서드를 적지 않아도 된다.
  };

  changeName = () => {
    // this.state.name = this.state.name + "1"; // << 이걸 권장하지 않는다.
    // '상태값' + '1' => '상태값1'
    this.setState({ name: this.state.name + "1" });
    console.log(this.state.name);
  };

  render() {
    console.log("render");
    console.log(this);
    return (
      <>
        <div onClick={this.increaseFunc.bind(this)}>{this.num}</div>
        <div onClick={this.increase}>{this.num}</div>
        <div onClick={this.changeName}>{this.state.name}</div>
      </>
    );
  }
}
