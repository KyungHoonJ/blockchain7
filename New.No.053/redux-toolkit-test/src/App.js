import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { action, counterThunk } from "./modules/counter";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.value);
  const isLoading = useSelector((state) => state.count.isLoading);
  const [inputCount, setCount] = useState(0);
  const [input, setInput] = useState(0);

  return (
    <div>
      <div>{count}</div>
      {!isLoading || <div>Now Loading</div>}
      <div>
        <input
          type={"number"}
          value={input}
          onInput={({ target: { value } }) => {
            setInput(value);
          }}
          placeholder={"input Count"}
        />
      </div>
      <button
        onClick={() => {
          dispatch(action.increment());
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          dispatch(action.decrement());
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          dispatch(action.input({ count: input }));
          // input 메서드에 전달되는 input 매개변수는 payload 자체이다.
        }}
      >
        set Count
      </button>
      <div>
        <input
          type={"number"}
          value={inputCount}
          onInput={(e) => {
            setCount(e.target.value);
          }}
          placeholder={"count"}
        />
        <button
          onClick={() => {
            dispatch(counterThunk(inputCount));
            // counter에서 createAsyncThunk로 정의한 변수는 action 함수처럼 사용할 수 있다.
          }}
        >
          set Count
        </button>
      </div>
    </div>
  );
}

export default App;
