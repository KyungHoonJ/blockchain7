import styled from "styled-components";

const AddBoardComponent = ({ changeFuncs, upload }) => {
  return (
    <AddBoardBox>
      <label>
        Title : <input type="text" onInput={changeFuncs.changeTitle} />
      </label>
      <label>
        Text : <input type="text" onInput={changeFuncs.changeText} />
      </label>
      <button onClick={upload}>UpLoad</button>
    </AddBoardBox>
  );
};

export default AddBoardComponent;

const AddBoardBox = styled.div`
  label {
    display: block;
  }
`;
