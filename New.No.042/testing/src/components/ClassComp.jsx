import React from "react";

export default class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.props.func();
    this.state = { test: "state test" }; // state 선언 및 정의(초기화)
  }

  render() {
    return (
      <div
        onClick={function () {
          this.setState({ test: this.state.test + "1" }); // state 재정의
        }.bind(this)}
      >
        ClassComp {this.props.text} {this.state.test}
      </div>
    );
  }
}
