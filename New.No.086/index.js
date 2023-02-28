const Compiler = require("./compiler");
const Client = require("./web3");

const {
  Test: { abi, bytecode },
} = Compiler.compile("Test.sol");

const client = new Client("http://127.0.0.1:8545");
const txObj = { data: bytecode };
const contract = new client.web3.eth.Contract(abi);
// 어제의 4번과 같다

async function init() {
  const instance = await contract.deploy(txObj).send({
    from: "0xA03057b5936B4E1433D1125d2737dA67b7E383Ff",
    gas: 1000000,
  });
  // 어제의 eth.sendTransaction(txObj)와 같다
  console.log(instance);
  console.log(instance.options.address); // CA : 0x59d4E819BF23c23Db36311BE0a78769D7c7081d2
}
// init();

async function test() {
  const accounts = await client.web3.eth.getAccounts();
  //   console.log(accounts.length);

  const ca = "0x59d4E819BF23c23Db36311BE0a78769D7c7081d2";
  const deployed = new client.web3.eth.Contract(abi, ca);
  // 어제의 4, 5번과 같다

  let text = await deployed.methods.getText().call();
  console.log("text", text);

  await deployed.methods
    .setText("오점뭐?")
    .send({ from: accounts[1], gas: 1000000 });
  text = await deployed.methods.getText().call();
  console.log("text", text);

  const balance = await client.web3.eth.getBalance(accounts[1]);
  console.log(balance);
}
test();
