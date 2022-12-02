import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import BoardComponent from "./Component";
import { action } from "../../../modules/board";
import CommentContainer from "../Comment/Container";

const BoardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams(useLocation()); // useParams의 결과는  {id:***} 으로 나온다.
  const item = useSelector((state) =>
    state.board.find((item) => item.id == id)
  );
  const userName = useSelector((state) => state.userInfo.userName);

  const remove = () => {
    dispatch(action.remove(item.id));
    navigate("/");
  };

  return (
    <>
      <BoardComponent
        item={item}
        remove={remove}
        isCreator={userName == item.userName}
      />
      <CommentContainer />
    </>
  );
};

export default BoardContainer;
