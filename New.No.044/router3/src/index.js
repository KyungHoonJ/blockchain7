import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import Log from "./components/Log";
import In from "./components/Log/In";
import Out from "./components/Log/Out";

const router = createBrowserRouter([
  {
    // 이 안에서 라우터에 대한 설정을 모두 구현한다.
    path: "", // root
    element: <App />, // component
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "log",
        element: <Log />,
        children: [
          {
            path: "in",
            element: <In />,
          },
          {
            path: "out",
            element: <Out />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
