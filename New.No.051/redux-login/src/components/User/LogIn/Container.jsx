import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import LogInComponent from "./Component";
import { action } from "../../../modules/userInfo";
import store from "../../../modules/store";

const LogInContainer = ({ userName }) => {
  const navigate = useNavigate(); // location.href 같은 훅이다.

  const onClick = async (userId, userPw) => {
    store.dispatch(action.logIn(userId, userPw, store.getState().userDB));
    // const tempUser = await axios.post(
    //   "http://localhost:8080/api/user/login",
    //   {
    //     userId,
    //     userPw,
    //   },
    //   { withCredentials: true }
    // );
    // console.log(tempUser);
  };

  useEffect(() => {
    if (userName) navigate("/");
  }, [userName]);

  return <LogInComponent onClick={onClick} />;
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(LogInContainer);
