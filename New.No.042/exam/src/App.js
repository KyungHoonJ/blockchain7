import styled from "styled-components";
import BoardBox from "./components/BoardBox";
import UserBox from "./components/UserBox";

function App() {
  return (
    <AppBox>
      <UserBox />
      <BoardBox />
    </AppBox>
  );
}

const AppBox = styled.div``;

export default App;
