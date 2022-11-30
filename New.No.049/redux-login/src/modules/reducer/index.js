import { combineReducers } from "redux";
import { reducer as userDB } from "./userDB";
import { reducer as userInfo } from "./userInfo";

export const reducer = combineReducers({ userDB, userInfo });
