import axios from "axios";
import { useEffect, useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = ({ account }: { account: string }) => {
  const [list, setList] = useState<Array<nftData>>([]);
  // API Server에서 리스트 받아서 출력하자
  useEffect(() => {
    (async () => {
      console.log(
        await axios.get(
          "https://ipfs.io/ipfs/QmYeteDyVns19F3PNi1PtYg4X8fQDf9ZGamGkwHV2epxAA"
        )
      );
      // console.log(
      //   await axios.get(
      //     "https://gateway.pinata.cloud/ipfs/QmYeteDyVns19F3PNi1PtYg4X8fQDf9ZGamGkwHV2epxAA"
      //   )
      // );
      setList(
        (await axios.post("http://localhost:8080/api/list", { from: account }))
          .data
      );
    })();
  }, [account]);
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
