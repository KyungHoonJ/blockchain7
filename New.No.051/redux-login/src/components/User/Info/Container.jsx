import { connect } from "react-redux";
// import axios from "axios";

import InfoComponent from "./Component";
import store from "../../../modules/store";
import { action } from "../../../modules/userInfo";

const InfoContainer = ({ userName }) => {
  const onClick = async () => {
    store.dispatch(action.logOut());

    // const tempUser = await axios.post("http://localhost:8080/api/user/logout", {
    //   userId: "1",
    // });
    // console.log(tempUser);
  };

  return <InfoComponent userName={userName} onClick={onClick} />;
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(InfoContainer);
