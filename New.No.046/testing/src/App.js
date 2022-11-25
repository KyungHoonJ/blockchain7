import logo from "./logo.svg";
import "./App.css";
import PropsTest from "./components/PropsTest";
import ContextTest from "./components/ContextTest";
import ReducerTest from "./components/ReducerTest";
import Office from "./components/Office";
import ReducerTest2 from "./components/ReducerTest2";

function App() {
  return (
    <div className="App">
      <ReducerTest2 />
      <PropsTest />
      <ContextTest />
      <ReducerTest>
        <Office />
      </ReducerTest>
    </div>
  );
}

export default App;
