import { Link, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { TodoBtn } from "../setting";
import TodoModal from "./TodoModal";
import List from "./List";
import { useState } from "react";
// export 시 default를 쓰지 않으면 {}를 사용해 구조분해할당 형식으로 가져와야한다.

export default function Todo() {
  const [list, setList] = useState([
    {
      taskName: "한글?",
      status: 0,
    },
    {
      taskName: "한글?",
      status: 1,
    },
    {
      taskName: "한글?",
      status: 2,
    },
  ]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoModalBtnBox>
        <Link to={"add"}>
          <TodoBtn className="sky">Add Task</TodoBtn>
        </Link>
      </TodoModalBtnBox>
      <List list={list} setList={setList} />
      <Routes>
        <Route
          path={"add"}
          element={<TodoModal setList={setList} func={"Add"} />}
        />
        <Route
          path={"edit"}
          element={<TodoModal setList={setList} func={"Edit"} />}
        />
      </Routes>
    </div>
  );
}

const TodoModalBtnBox = styled.div`
  text-align: right;
`;
