import { useEffect, useState } from "react";

import BreadShopContract from "./contracts/BreadShop.json";

export const BreadShop = ({ web3, account }) => {
  const [bread, setBread] = useState(0);

  const constructor = async () => {
    if (!web3) return;

    const networkId = await web3.eth.net.getId();
    const CA = BreadShopContract.networks[networkId].address;
    const abi = BreadShopContract.abi;

    const deployed = new web3.eth.Contract(abi, CA);

    const _bread = await deployed.methods.getBread().call();
    setBread(_bread);
  };

  useEffect(() => {
    constructor();
  }, []);

  return (
    <div>
      <div>현재 빵 개수 : {bread}</div>
    </div>
  );
};
