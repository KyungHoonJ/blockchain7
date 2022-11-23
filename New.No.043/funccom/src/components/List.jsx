import { useState } from "react";

export default function List() {
  const [listArr, setListArr] = useState([
    { text: "adsf1", user: "adsf" },
    { text: "adsf2", user: "adsf" },
    { text: "adsf3", user: "adsf" },
    { text: "adsf4", user: "adsf" },
    { text: "adsf5", user: "adsf" },
  ]);

  return (
    <div>
      {listArr.map((item, index) => (
        <div>
          <div key={`${index}-1`}>{item.text}</div>
          <div key={`${index}-2`}>{item.user}</div>
        </div>
      ))}
    </div>
  );
}
