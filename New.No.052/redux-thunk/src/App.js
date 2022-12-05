// redux-thunk는 무슨 역활을 하는가?
// - 비동기 처리를 사용하기 위해서 미들웨어로 쓰인다.

import { useSelector, useDispatch } from "react-redux";

import { action } from "./modules/count";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div>
      <div>{count}</div>
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
    </div>
  );
}

export default App;
