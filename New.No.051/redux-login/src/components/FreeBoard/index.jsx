import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import AddContainer from "./Add/Container";
import ListContainer from "./List/Container";
import BoardContainer from "./Board/Container";
import EditContainer from "./Edit/Container";

const FreeBoard = () => {
  return (
    <FreeBoardBox>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AddContainer />
              <ListContainer />
            </>
          }
        />
        <Route path="/board/:id" element={<BoardContainer />} />
        <Route path="/edit/:id" element={<EditContainer />} />
      </Routes>
    </FreeBoardBox>
  );
};

export default FreeBoard;

const FreeBoardBox = styled.div``;
