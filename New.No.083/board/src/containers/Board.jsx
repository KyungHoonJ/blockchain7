import { useEffect, useState } from "react";

import { board } from "../api";
import { BoardComponent } from "../components/Board";

export const BoardContainer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    board({ limit: 10, offset: 0, order: [["id", "DESC"]] }).then(
      ({ isError, list }) => {
        if (!isError) setList(list);
      }
    );
  }, []);

  return <BoardComponent list={list} />;
};
