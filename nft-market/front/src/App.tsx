import { List } from "./components/List";
import { Mint } from "./components/Mint";
import { useWeb3 } from "./modules/useWeb3";

function App() {
  const { web3, chainId, account, logIn } = useWeb3();
  return (
    <div>
      <div>
        {account && web3 ? (
          <div>
            <div>ChainId : {chainId}</div>
            <div>Account : {account}</div>
            <Mint web3={web3} account={account} />
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
      <List account={account} />
    </div>
  );
}

export default App;
