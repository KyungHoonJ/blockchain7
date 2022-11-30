import { useState } from "react";
import styled from "styled-components";

// 3. onClick을 부모 컴포넌트(RegistContainer)로부터 props로 받는다.
const RegistComponent = ({ onClick }) => {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [userName, setName] = useState("");

  console.log("3. RegistComponent", onClick);

  return (
    <RegistBox>
      <input
        type={"text"}
        value={userId}
        onInput={(e) => {
          setId(e.target.value);
        }}
        placeholder={"ID"}
      />
      <input
        type={"password"}
        value={userPw}
        onInput={(e) => {
          setPw(e.target.value);
        }}
        placeholder={"PW"}
      />
      <input
        type={"text"}
        value={userName}
        onInput={(e) => {
          setName(e.target.value);
        }}
        placeholder={"NAME"}
      />
      <button
        onClick={() => {
          console.log("4. button onClick");
          // 4. 사용자가 Regist 버튼을 클릭 했을 때 onClick 함수를 호출한다. 매개변수로 userId, userPw, userName를 전달한다.
          onClick(userId, userPw, userName);
        }}
      >
        Regist
      </button>
    </RegistBox>
  );
};

export default RegistComponent;

const RegistBox = styled.div`
  input {
    padding: 5px;
  }
`;
