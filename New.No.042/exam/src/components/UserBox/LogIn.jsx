import { useEffect, useState } from "react";
import styled from "styled-components";

export default function LogIn({ users, setUser }) {
  const [userId, setId] = useState("");
  const [userPw, setPw] = useState("");
  const [ableId, setAbleId] = useState(false);
  const [ablePw, setAblePw] = useState(false);

  useEffect(() => {
    setId(userId.length ? userId.match(/[a-z]/gi).join("") : "");
    if (userId.length < 5) setAbleId(false);
    else setAbleId(true);
  }, [userId]);

  useEffect(() => {
    if (userPw.length < 10) setAblePw(false);
    else setAblePw(true);
  }, [userPw]);

  function onLogIn() {
    const tempUser = users.find((item) => item.userId === userId);
    if (tempUser && tempUser.userPw === userPw) setUser(tempUser.userId);
  }

  return (
    <LogInBox>
      <input
        type={"text"}
        onInput={(e) => {
          setId(e.target.value);
        }}
        placeholder="ID"
        value={userId}
      />
      <input
        type={"password"}
        onInput={(e) => {
          setPw(e.target.value);
        }}
        placeholder="PW"
        value={userPw}
      />
      <button
        onClick={() => {
          if (!(ableId && ablePw)) return;
          onLogIn();
        }}
      >
        Log in
      </button>
    </LogInBox>
  );
}

const LogInBox = styled.div``;
