import styled from "styled-components";

const LogInComponent = ({ changeFuncs, logIn }) => {
  return (
    <LogInBox>
      <label>
        ID : <input type="text" onInput={changeFuncs.changeId} />
      </label>
      <label>
        PW : <input type="text" onInput={changeFuncs.changePw} />
      </label>
      <button onClick={logIn}>Log In</button>
    </LogInBox>
  );
};

export default LogInComponent;

const LogInBox = styled.div`
  label {
    display: block;
  }
`;
