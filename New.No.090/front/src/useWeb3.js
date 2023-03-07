import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    if (!window.ethereum) return;
    (async () => {
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(_account);

      const _web3 = new Web3(window.ethereum);
      setWeb3(_web3);
    })();
  }, []);

  return [web3, account];
};

export default useWeb3;
