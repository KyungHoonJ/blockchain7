export default function PropsTest() {
  return <Child1 test="testing" />;
}
function Child1({ test }) {
  return <Child2 test={test} />;
}
function Child2({ test }) {
  return <Child3 test={test} />;
}
function Child3({ test }) {
  return <Child4 test={test} />;
}
function Child4({ test }) {
  return <Child5 test={test} />;
}
function Child5({ test }) {
  return <div>{test}</div>;
}
