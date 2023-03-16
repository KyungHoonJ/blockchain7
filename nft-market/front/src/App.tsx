import { List } from "./components/List";
import { Mint } from "./components/Mint";
import { useWeb3 } from "./modules/useWeb3";

function App() {
  const { chainId, account, logIn } = useWeb3();
  return (
    <div>
      <div>
        {account ? (
          <div>
            <div>ChainId : {chainId}</div>
            <div>Account : {account}</div>
            <Mint />
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                logIn();
              }}
            >
              MetaMask Log In
            </button>
          </div>
        )}
      </div>
      <List />
    </div>
  );
}

export default App;
