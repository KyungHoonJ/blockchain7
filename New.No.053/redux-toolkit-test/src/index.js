// yarn create react-app redux-toolkit-test
// yarn add redux react-redux
// yarn add redux-devtools-extension --dev

// yarn add @reduxjs/toolkit
// @reduxjs/toolkit란
// - redux toolkit라고 많이 부른다.
// - redux 라이브러리의 업데이트 버전, 새로운 버전
// - createStore가 deprecated된 원인

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./modules/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
