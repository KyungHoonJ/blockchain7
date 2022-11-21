// export default function FuncComp(props) {
//   const {text, func} = props
//   props.func();

//   return <div>FuncComp {props.text}</div>;
// }

export default function FuncComp({ text, func }) {
  func();

  return <div>FuncComp {text}</div>;
}
