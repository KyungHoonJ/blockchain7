// redux-thunk는 무슨 역활을 하는가?
// - 비동기 처리를 사용하기 위해서 미들웨어로 쓰인다.

import { useSelector, useDispatch } from "react-redux";

import { action } from "./modules/count";
import promiseTime from "./modules/promiseTime";

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          promiseTime(action.increment(), 1000)
            .then((data) => {
              // then 메서드를 사용하여 매개변수로 콜백함수를 전달한다.
              // 전달된 콜백함수는 매개변수로 Promise의 resolve 결과를 받는다.
              // promiseTime.js의 6번째 줄에서 전달하는 type 매개변수를 여기서 data 매개변수로 받는다.
              dispatch(data);
            })
            .catch((error) => {});
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
