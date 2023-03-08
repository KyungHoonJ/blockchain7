import "./App.css";
import { BreadShop } from "./BreadShop";
import { useWeb3 } from "./useWeb3";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <>메타마스크 연결 필요</>;
  return (
    <div className="App">
      <BreadShop web3={web3} account={account} />
    </div>
  );
}

export default App;
