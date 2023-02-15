import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../api";
import RegistComponent from "../components/Regist";

const RegistContainer = () => {
  const [registData, setRegistData] = useState({
    id: "",
    pw: "",
    name: "",
  });
  const navigate = useNavigate();

  const changeId = (e) => {
    setRegistData((state) => ({ ...state, id: e.target.value }));
  };

  const changePw = (e) => {
    setRegistData((state) => ({ ...state, pw: e.target.value }));
  };

  const changeName = (e) => {
    setRegistData((state) => ({ ...state, name: e.target.value }));
  };

  const regist = async () => {
    if (!registData.id || !registData.pw || !registData.name) return;
    const result = await signIn(registData);
    if (!result.isError) navigate("/");
  };

  return (
    <RegistComponent
      changeFuncs={{ changeId, changePw, changeName }}
      regist={regist}
    />
  );
};

export default RegistContainer;
