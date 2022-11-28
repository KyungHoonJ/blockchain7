import { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import store from "./store";

function App() {
  const [inputCount, setCount] = useState(0);

  return (
    <div className="App">
      <div>{store.getState().count1}</div>
      {/* store.getState() 는 store를 가져온다. */}
      <input
        value={inputCount}
        type={"number"}
        onInput={(e) => {
          setCount(+e.target.value);
        }}
        placeholder="number"
      />
      <button
        onClick={() => {
          store.dispatch({
            type: "count1/plus",
            payload: { input: inputCount },
          });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count1/minus",
            payload: { input: inputCount },
          });
        }}
      >
        -
      </button>

      <button
        onClick={() => {
          store.dispatch({
            type: "count2/plus",
          });
        }}
      >
        2 +
      </button>
      <button
        onClick={() => {
          store.dispatch({
            type: "count2/minus",
          });
        }}
      >
        2 -
      </button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
