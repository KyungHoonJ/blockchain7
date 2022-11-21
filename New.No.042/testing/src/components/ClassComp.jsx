import React from "react";

export default class ClassComp extends React.Component {
  constructor(props) {
    super(props);
    this.props.func();
  }

  render() {
    return <div>ClassComp</div>;
  }
}
