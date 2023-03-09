const { abi, bytecode } = require("./build/contracts/JJJToken.json");
const Web3 = require("web3");
const web3 = new Web3("http://ganache.test.errorcode.help:8545");

const deployer = new web3.eth.Contract(abi);

(async () => {
  const temp = await web3.eth.getBalance(
    "0xFBf7Aeb33414990F698Bf37d66C4E606492DF64a"
  );
  console.log(temp);
  const deployed = await deployer
    .deploy({ data: bytecode, arguments: ["JJJToken", "JJJ", 1000] })
    .encodeABI();
  const tx = await web3.eth.sendTransaction({
    from: "0xFBf7Aeb33414990F698Bf37d66C4E606492DF64a",
    data: deployed,
  });
  console.log(tx);

  // console.log(deployed.options);
})();
