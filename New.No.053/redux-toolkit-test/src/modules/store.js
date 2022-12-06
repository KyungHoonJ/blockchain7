// import { createStore, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";

// import { initialize, reducer } from "./counter";

// const store = createStore(
//   combineReducers({ count: reducer }),
//   { count: initialize },
//   composeWithDevTools()
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
// toolkit 사용 시 createStore가 아닌 configureStore를 사용한다.
// createStore와 마찬가지로 store를 반환(return)한다.

import { reducer } from "./counter";

export const store = configureStore({
  // configureStore는 객체를 매개변수로 받으며 객체 내에서 reducer, middleware 등 store에 필요한 작업을 할 수 있다.

  reducer: { count: reducer },
  // reducer는 이전의 combineReducers와 같이 객체로 받으며 state 명을 키로, 해당 reducer를 값으로 받는다.

  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  // 18번줄은 미들웨어 추가 시 사용
  // getDefaultMiddleware는 기본 미들웨어를 가져오는 함수
  // - redux toolkit은 기본적으로 'redux-devtools-extension' 라이브러리와 'redux-thunk' 라이브러리를 지원한다.
});
