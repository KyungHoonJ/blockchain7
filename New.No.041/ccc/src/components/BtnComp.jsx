import React from "react";

export default class BtnComp extends React.Component {
  // 컴포넌트는 대문자로 시작해야한다.(파스칼 표기법)
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="num-pad"
        // onClick={this.props.onClick}
        onClick={() => {
          this.props.onClick(this.props.item);
        }}
      >
        {this.props.item}
      </div>
    );
  }
}
