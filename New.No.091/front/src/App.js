import "./App.css";
import { useWeb3 } from "./useWeb3";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <>메타마스크 연결 필요</>;
  return <div className="App"></div>;
}

export default App;
