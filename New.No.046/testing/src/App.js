import logo from "./logo.svg";
import "./App.css";
import PropsTest from "./components/PropsTest";
import ContextTest from "./components/ContextTest";
import ReducerTest from "./components/ReducerTest";
import Office from "./components/Office";

function App() {
  return (
    <div className="App">
      <PropsTest />
      <ContextTest />
      <ReducerTest>
        <Office />
      </ReducerTest>
    </div>
  );
}

export default App;
