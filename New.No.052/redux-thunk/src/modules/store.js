import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer, initialize } from "./count";

const store = createStore(
  combineReducers({ count: reducer }),
  { count: initialize },
  composeWithDevTools()
);

export default store;
