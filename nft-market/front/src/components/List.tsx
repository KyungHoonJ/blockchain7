import axios from "axios";
import { useEffect, useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = () => {
  const [list, setList] = useState<Array<nftData>>([]);
  // API Server에서 리스트 받아서 출력하자
  useEffect(() => {
    (async () => {
      setList((await axios.get("http://localhost:8080/api/list")).data);
    })();
  }, []);
  return (
    <ul>
      {list.map((item, idx) => (
        <Item item={item} key={`item-${idx}`} />
      ))}
    </ul>
  );
};

const Item = ({ item: { name, description, image } }: { item: nftData }) => {
  return (
    <li>
      <div>{name}</div>
      <div>{description}</div>
      <div>
        <img src={image} />
      </div>
    </li>
  );
};
