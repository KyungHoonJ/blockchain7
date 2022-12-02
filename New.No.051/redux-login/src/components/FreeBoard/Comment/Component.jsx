import { useState } from "react";
import styled from "styled-components";

const CommentComponent = ({ add, list, edit, remove }) => {
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
            add(addText);
          }}
        >
          Add Comment
        </button>
      </CommentAddBox>
      {list.map((item, index) => (
        <CommentItemComponent
          key={`comment-${index}`}
          item={item}
          edit={edit}
          remove={remove}
        />
      ))}
    </CommentBox>
  );
};

export default CommentComponent;

const CommentBox = styled.div``;

const CommentAddBox = styled.div``;

const CommentItemComponent = ({ item, edit, remove }) => {
  const [isEdit, setIsEdit] = useState(false);
  // isEdit가 참이면 수정 가능 상태 / 거짓이면 수정 불가 상태
  const [editText, setEditText] = useState(item.text);
  return (
    <div>
      {isEdit ? (
        <input
          type="text"
          value={editText}
          onInput={(e) => {
            setEditText(e.target.value);
          }}
        />
      ) : (
        item.text
      )}{" "}
      - {item.userName} [{" "}
      <button
        onClick={() => {
          if (isEdit) {
            edit(item.id, editText);
            setIsEdit(false);
          } else {
            setEditText(item.text);
            setIsEdit(true);
          }
        }}
      >
        Edit
      </button>{" "}
      <button
        onClick={() => {
          isEdit ? setIsEdit(false) : remove(item.id);
        }}
      >
        {isEdit ? "Cancel" : "Remove"}
      </button>{" "}
      ]
    </div>
  );
};
