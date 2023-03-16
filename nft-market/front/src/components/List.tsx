import { useState } from "react";

interface nftData {
  name: string;
  description: string;
  image: string;
}

export const List = () => {
  const [list, setList] = useState<Array<nftData>>([
    {
      name: "test NFT",
      description: "testing NFT with Pinata",
      image:
        "https://gateway.pinata.cloud/ipfs/Qmcr39LBMvDtkRTHXa6CyktJJxDAhFNHsHBdsRaDZc5jiB",
    },
    {
      name: "test NFT",
      description: "testing NFT with Pinata",
      image:
        "https://gateway.pinata.cloud/ipfs/Qmcr39LBMvDtkRTHXa6CyktJJxDAhFNHsHBdsRaDZc5jiB",
    },
  ]);
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
