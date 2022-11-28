import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// 위 import 와 아래 import의 차이 : 위는 설치된 라이브러리, 아래는 개발자가 작성한 코드
//   - 교수님의 습관
// 단, import는 다른 코드들에 비해서 무조건적으로 위에 있어야 한다.

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

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
