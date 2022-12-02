import { useState } from "react";
import styled from "styled-components";

const AddComponent = ({ onClick }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <AddBox>
      <input
        type={"text"}
        value={title}
        onInput={(e) => {
          setTitle(e.target.value);
        }}
        placeholder={"Title"}
      />
      <textarea
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        placeholder={"Text"}
      />
      {/* 정현이는 비밀번호 추가할 것 */}
      <button
        onClick={() => {
          onClick(title, text);
        }}
      >
        Add Board
      </button>
    </AddBox>
  );
};

export default AddComponent;

const AddBox = styled.div``;
