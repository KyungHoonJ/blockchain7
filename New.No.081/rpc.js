const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8545",
  headers: {
    "content-type": "application/json",
  },
});

const temp = async () => {
  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: ["latest", true],
    },
  });
  console.log(result);
};
temp();
