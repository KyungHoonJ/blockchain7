const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const CounterContract = require("./build/contracts/Counter.json");

const app = express();
const web3 = new Web3("http://127.0.0.1:8545");

app.use(cors({ origin: true, credentials: true }));
// origin : true => 모든 주소에 대해서 cors 허용
app.use(express.json());

app.use("/", async (req, res, next) => {
  const networkId = await web3.eth.net.getId();
  global.CA = CounterContract.networks[networkId].address;
  const abi = CounterContract.abi;

  global.deployed = new web3.eth.Contract(abi, global.CA);

  next();
});

app.post("/api/count", async (req, res) => {
  const count = await global.deployed.methods.getCount().call();
  res.json({ count });
});

app.post("/api/ca", async (req, res) => {
  res.json({ CA: global.CA });
});

app.post("/api/increment", async (req, res) => {
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);
  const data = await global.deployed.methods.increment().encodeABI();

  const txObj = {
    nonce,
    from,
    to: global.CA,
    data,
  };

  res.json(txObj);
});

app.post("/api/decrement", async (req, res) => {
  const from = req.body.from;
  const nonce = await web3.eth.getTransactionCount(from);
  const data = await global.deployed.methods.decrement().encodeABI();

  const txObj = {
    nonce,
    from,
    to: global.CA,
    data,
  };

  res.json(txObj);
});

app.listen(8080, () => {
  console.log("server start");
});
