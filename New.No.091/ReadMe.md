```bash
cd New.No.091
mkdir back
cd back
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
cd ..
yarn create react-app front
cd front
yarn add web3
```

# 스마트 컨트렉트의 거래

- CA : Contract Address, 계정 즉 지갑 주소 중 하나, Ether를 갖고 있을 수 있다.

- function의 payable 옵션
  - payable 이름 그대로 거래 가능하도록 해준다.
  - CA 주소로 해당 컨트렉트의 Balance(잔액)을 확인할 수 있다.
  ```solidity
  function sellBread() public payable {
    breads[msg.sender] -= 1;
    payable(msg.sender).transfer(10 ** 18);
    // msg.sender, 즉 트랜잭션을 보낸 지갑 계정에 Ether를 보낸다.
  }
  ```
