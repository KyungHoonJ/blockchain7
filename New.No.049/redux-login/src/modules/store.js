import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initialize as userInfoIni } from "./reducer/userInfo";
import { initialize as userDBIni } from "./reducer/userDB";
import { reducer } from "./reducer";

const store = createStore(
  reducer,
  { userInfo: userInfoIni, ...userDBIni },
  composeWithDevTools()
);

export default store;
