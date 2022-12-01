import styled from "styled-components";

import AddContainer from "./Add/Container";
import ListContainer from "./List/Container";

const FreeBoard = () => {
  return (
    <FreeBoardBox>
      <AddContainer />
      <ListContainer />
    </FreeBoardBox>
  );
};

export default FreeBoard;

const FreeBoardBox = styled.div``;
