import { useSelector } from "react-redux";
import ListComponent from "./Component";

const ListContainer = () => {
  const list = useSelector((state) => state.board);

  return <ListComponent list={list} />;
};

export default ListContainer;
