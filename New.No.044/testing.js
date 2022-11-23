const temp = {
  path: "",
  element: <App />,
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
      path: "board",
      element: <Board />,
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
};
