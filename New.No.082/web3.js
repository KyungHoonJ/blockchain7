const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

console.log(Web3);

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));

console.log(web3.eth);
// 10분 동안 지갑 계정 주소 받아오자.
//   - ganache에 있는 계정 주소
web3.eth
  .getAccounts()
  .then((accounts) =>
    accounts.forEach((account, idx) =>
      web3.eth
        .getBalance(account)
        .then((balance) =>
          console.log(
            `(${idx}) ${account} (${web3.utils.fromWei(balance)} Eth)`
          )
        )
    )
  );

// 버튼 클릭시 0번 계정에서 1번 계정으로 1이더 전송, 11시 5분 풀이
//   - 힌트 16진수 필요 없음
//   - 11시에 추가 힌트 : IPC
const test = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(web3.eth.getAccounts()); // Promise{<*****>}
  //   accounts.forEach((account) => {
  //     console.log(account);
  //   });
  // 20분까지 밸런스 가져와서 "계정 : 밸런스" << 찍어보자
  for (let i = 0; i < accounts.length; ++i) {
    const balanceWei = await web3.eth.getBalance(accounts[i]);
    const balance = web3.utils.fromWei(balanceWei);
    // utils 는 여러가지 편의 메서드들을 갖고있다. 제공한다.
    // fromWei 는 Wei 단위의 금액을 다른 단위로 바꿔준다.
    //   - 2번째 매개변수로 변환할 단위를 설정한다. 기본값은 ether다.
    console.log("(" + i + ") " + accounts[i] + " (" + balanceWei + " Wei)");
    console.log("(" + i + ") " + accounts[i] + " (" + balance + " Eth)");
  }

  document.getElementById("send").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "personal_unlockAccount",
        params: [accounts[0], "asdfqwer1234"],
      },
    });
    const transaction = await web3.eth.sendTransaction({
      from: accounts[0],
      to: accounts[1],
      value: web3.utils.toWei("1"),
    });
    console.log(transaction);
    const transaction1 = await web3.eth.getTransaction(
      transaction.transactionHash
    );
    console.log(transaction1);
  };

  const transaction = await web3.eth.getTransaction(
    "0x5c68d70261dfceb1c9a2f079bf45b9c4679a0340327e7deecb866e9554bbbdec"
  );
  console.log(transaction);

  // {
  //   blockHash: "0x33ea07289f2db60f1e52ccf16bd4692cb17ebabbb27bed70b17eed8cc79ef2fd";
  //    - 트랜잭션이 포함된 블록의 hash
  //   blockNumber: 2;
  //    - 트랜잭션이 포함된 블록의 높이
  //   from: "0xcf2CC9c2115FE3Bfe5B4CE789DBa49f1Ed7C2e2D";
  //   gas: 90000;
  //   gasPrice: "20000000000";
  //   hash: "0x0eb4a148af526662f8ccb424eddb1805036cf2ab02b3d699024e9528cfa1371e";
  //   input: "0x";
  //   nonce: 1;
  //    - 블록에서는 nonce가 난이도 문제를 풀기 위해 시도한 횟수
  //    - 이건 트랜잭션의 nonce => 보낸 사람이 보낸 트랜잭션의 개수
  //   r: "0x2cd5fc3344babba6191d14e3e2de6b8f06d54e8cb2ace949c12a3372cb4273de";
  //   s: "0x67fdcdfc5f5a747fc01868f682fd898f90a0746225d2ef9c6451b74a4a0d3732";
  //   to: "0x8c72Be33d362c427F5C484e783a0F86dc038F841";
  //   transactionIndex: 0;
  //   v: "0x25";
  //    - RSV 전부 서명 관련 데이터이다.
  //    - 우리가 sendTransaction 할 때 서명 한 적이 있나? << 자동으로 서명한다.
  //    - 어떤 걸 기준으로 서명할까? << unlock할 때 서명을 허가한다.
  //    - 메타마스크에서 보낼 때도 자동으로 서명한다. << 정확히는 우리가 서명을 허가한다. << 보낼 때 내용 확인 클릭 시
  //   value: "1000000000000000000";
  // }

  document.getElementById("stop").onclick = async function () {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_stop",
      },
    });
  };
  document.getElementById("start").onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_setEtherbase",
        params: [accounts[0]],
      },
    });
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_start",
      },
    });
  };
};
test();
