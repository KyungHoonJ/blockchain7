import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { useEffect } from "react";
import JJJTokenContract from "./JJJToken.json";

function App() {
  useEffect(() => {
    (async () => {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(JJJTokenContract.abi);
      const [_account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const txObj = {
        data: JJJTokenContract.bytecode,
        arguments: ["JJJToken", "JJJTK11", 10000],
      };
      const deployed = await contract.deploy(txObj).send({
        from: _account,
        gas: 2000000,
      });
      console.log(deployed.options.address);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
