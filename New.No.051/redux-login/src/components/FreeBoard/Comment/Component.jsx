import { useState } from "react";
import styled from "styled-components";

const CommentComponent = ({ onClick, list }) => {
  const [addText, setAddText] = useState("");
  return (
    <CommentBox>
      <CommentAddBox>
        <input
          type={"text"}
          value={addText}
          onInput={(e) => {
            setAddText(e.target.value);
          }}
          placeholder={"Comment"}
        />
        <button
          onClick={() => {
            onClick(addText);
          }}
        >
          Add Comment
        </button>
      </CommentAddBox>
      {list.map((item, index) => (
        <div key={`comment-${index}`}>{item.text}</div>
      ))}
    </CommentBox>
  );
};

export default CommentComponent;

const CommentBox = styled.div``;

const CommentAddBox = styled.div``;
