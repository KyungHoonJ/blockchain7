import { useState } from "react";
import styled from "styled-components";

const EditComponent = ({ onClick, item }) => {
  const [title, setTitle] = useState(item.title);
  const [text, setText] = useState(item.text);

  return (
    <EditBox>
      <h1>
        <input
          type={"text"}
          value={title}
          onInput={(e) => {
            setTitle(e.target.value);
          }}
          placeholder={"Title"}
        />
      </h1>
      <h3>
        userName : {item.userName} - {item.createdAt}
      </h3>
      <p>
        <textarea
          type={"text"}
          value={text}
          onInput={(e) => {
            setText(e.target.value);
          }}
          placeholder={"Text"}
        />
      </p>
      <button
        onClick={() => {
          onClick(title, text);
        }}
      >
        Edit
      </button>
    </EditBox>
  );
};

export default EditComponent;

const EditBox = styled.div``;
