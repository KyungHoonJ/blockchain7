import { connect } from "react-redux";

import InfoComponent from "./Component";
import store from "../../../modules/store";
import { action } from "../../../modules/reducer/userInfo";

const InfoContainer = ({ userName }) => {
  const onClick = () => {
    store.dispatch(action.logOut());
  };

  return <InfoComponent userName={userName} onClick={onClick} />;
};

const mapStateToProps = (state, props) => {
  return {
    userName: state.userInfo.userName,
  };
};

export default connect(mapStateToProps)(InfoContainer);
