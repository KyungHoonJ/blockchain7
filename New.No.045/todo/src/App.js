import { useState } from "react";
import styled from "styled-components";

import Todo from "./components/Todo";

function App() {
  const [user, setUser] = useState(""); // 오늘의 과제

  return (
    <AppBox>
      <Todo></Todo>
    </AppBox>
  );
}

export default App;

const AppBox = styled.div`
  max-width: 1300px;
  margin: auto;

  &.test {
    background-color: lightgray;
    height: 100px;
  }

  @media only screen and (max-width: 1400px) {
    max-width: 1000px;
  }

  @media only screen and (max-width: 1100px) {
    max-width: 600px;
  }

  @media only screen and (max-width: 700px) {
    max-width: 300px;
  }
`;
