import { Link } from "react-router-dom";
import styled from "styled-components";

import { TodoBtn } from "../../setting";
import penImg from "./pen-solid.svg";
import trashImg from "./trash-solid.svg";
import { STATUSLIST } from "../../setting";

export default function Item({ item, index, setList }) {
  return (
    <ItemTr>
      <td>{index + 1}</td>
      <td>{item.taskName}</td>
      <td>
        <TodoBtn
          className={STATUSLIST[item.status].toLowerCase().replace(" ", "-")}
          style={{ cursor: "default" }}
        >
          {STATUSLIST[item.status]}
        </TodoBtn>
      </td>
      <td>
        <Link to={"/edit"} state={{ index, item }}>
          <TodoBtn className="sky">
            <img
              src={penImg}
              alt="penImg"
              style={{
                filter:
                  "invert(83%) sepia(38%) saturate(7494%) hue-rotate(146deg) brightness(103%) contrast(90%)",
              }}
            />
          </TodoBtn>
        </Link>
      </td>
      <td>
        <TodoBtn
          className="todo"
          onClick={() => {
            setList((list) => {
              const before = list.slice(0, index);
              const after = list.slice(index + 1);
              return [...before, ...after];
            });
          }}
        >
          <img
            src={trashImg}
            alt="trashImg"
            style={{
              filter:
                "invert(53%) sepia(5%) saturate(17%) hue-rotate(358deg) brightness(94%) contrast(88%)",
            }}
          />
        </TodoBtn>
      </td>
    </ItemTr>
  );
}

const ItemTr = styled.tr`
  text-align: center;
  height: 50px;

  td {
    border-bottom: 1px solid lightgray;

    img {
      width: 15px;
    }
  }
`;
