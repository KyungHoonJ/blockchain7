import { createStore, combineReducers } from "redux";
// combineReducers는 객체를 매개변수로 받으며 객체 내의 reducer들을 하나로 합쳐서 사용한다.
// 조건으로는 매개변수 객체의 key로 사용하는 store의 state와 이름이 같아야한다.
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer, initialize } from "./userInfo";

const store = createStore(
  combineReducers({ user: reducer }),
  //   { user: initialize },
  { ...initialize },
  composeWithDevTools()
);
// Redux의 저장소(store)를 만든다.

export default store;
