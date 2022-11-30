import styled from "styled-components";

import RegistContainer from "./Regist/Container";

const UserComponent = () => {
  return (
    <UserBox>
      <RegistContainer />
    </UserBox>
  );
};

export default UserComponent;

const UserBox = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;
