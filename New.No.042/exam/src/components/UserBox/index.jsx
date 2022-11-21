import { useEffect, useState } from "react";
import styled from "styled-components";
import Regist from "./Regist";
import LogIn from "./LogIn";
import LogOut from "./LogOut";

export default function UserBox() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserStyled>
      <Regist users={users} setUsers={setUsers} />
      <LogIn users={users} setUser={setUser} />
      <LogOut user={user} setUser={setUser} />
    </UserStyled>
  );
}

const UserStyled = styled.div``;
