import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import JJJTokenContract from "./JJJToken.json";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAcocunt] = useState();

  useEffect(() => {
    (async () => {
      const _web3 = new Web3("http://ganache.test.errorcode.help:8545");
      setWeb3(_web3);
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAcocunt(_account);

      console.log(_account);
      const { abi, bytecode } = JJJTokenContract;
      const deployer = new _web3.eth.Contract(abi);
      const deployed = await deployer
        .deploy({ data: bytecode })
        .send({ from: _account });
      console.log(deployed.options.address);
    })();
  }, []);
  return <div className="App"></div>;
}

export default App;
