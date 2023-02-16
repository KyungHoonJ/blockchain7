import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logIn } from "../api";
import LogInComponent from "../components/LogIn";

const LogInContainer = ({ setUser }) => {
  const [logInData, setLogInData] = useState({
    id: "",
    pw: "",
  });
  const navigate = useNavigate();

  const changeId = (e) => {
    setLogInData((state) => ({ ...state, id: e.target.value }));
  };

  const changePw = (e) => {
    setLogInData((state) => ({ ...state, pw: e.target.value }));
  };

  const logInFunc = async () => {
    if (!logInData.id || !logInData.pw) return;
    const result = await logIn(logInData);
    if (!result.isError) {
      setUser({ name: result.user.name });
      navigate("/");
    }
  };

  return (
    <LogInComponent changeFuncs={{ changeId, changePw }} logIn={logInFunc} />
  );
};

export default LogInContainer;
