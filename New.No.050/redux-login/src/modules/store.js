import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  initialize as userInfoIni,
  reducer as userInfoReducer,
} from "./userInfo";
import { initialize as userDBIni, reducer as userDBReducer } from "./userDB";
import { initialize as boardIni, reducer as boardReducer } from "./board";

const store = createStore(
  combineReducers({
    userDB: userDBReducer,
    userInfo: userInfoReducer,
    board: boardReducer,
  }),
  { userInfo: userInfoIni, ...userDBIni, board: boardIni },
  composeWithDevTools()
);

export default store;
