```bash
mkdir New.No.094
cd New.No.094
mkdir swap
cd swap
npm init -y
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init
```

# 토큰 스왑

- token swap : 이름 그대로 토큰을 다른 토큰으로 변경
- 보통 이전 토큰을 새로운 토큰으로 교환
- 거래소에서 '스왑기간', '스왑 지원 거래소', '마이그레이션 지원' 등으로 토큰 스왑 기능 지원을 표기한다.
- 토큰의 업데이트, 돈을 벌기 위한 방법

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthSwap {
  ERC20 public token;
  // 기존에 만든 토큰을 저장하여 사용
  uint public rate = 100;

  // 1 Ether = 100 token

  constructor(ERC20 _token) {
    // ERC20 토큰 생성 시 CA를 받아서 바로 생성할 수 있다.
    token = _token;
    // deployer.deploy('token', 'CA 전달')
  }

  function getToken() public view returns (address) {
    // 토큰을 받아온다.
    return address(token);
    // 토큰의 CA를 반환한다.
  }

  function getSwapBalance() public view returns (uint) {
    // 트랜잭션 보낸 계정의 토큰 잔액을 확인한다.
    return token.balanceOf(msg.sender);
  }

  function getThisAddress() public view returns (address) {
    // 현재 스마트 컨트렉트(EthSwap)의 CA를 반환한다.
    return address(this);
  }

  function getMsgSender() public view returns (address) {
    return msg.sender;
  }

  function getTokenOwner() public view returns (address) {
    return token._owner;
    // 토큰 배포자를 반환한다. 즉, 토큰에 대한 스마트 컨트렉트 등록자
  }

  function buyToken() public payable {
    // Ether로 토큰을 산다.
    uint256 tokenAmount = msg.value * rate;
    // 보낸 Ether => 토큰으로
    require(token.balanceOf(address(this)) >= tokenAmount);
    // 현재 컨트렉트에 토큰이 트랜잭션 보낸 계정에 줄 만큼 있는지 확인
    token.transfer(msg.sender, tokenAmount);
    // 토큰 보내기
  }

  function sellToken(uint256 _amount) public payable {
    // 토큰으로 Ether를 산다.
    require(token.balanceOf(msg.sender) >= _amount);
    // 트랜잭션 보낸 계정의 토큰 잔액을 확인
    uint256 etherAmount = _amount / rate;
    // 토큰을 기준으로 Ether를 계산

    require(address(this).balance >= etherAmount);
    // 현재 컨트렉트에 충분한 Ether가 있는지 확인
    token.transferFrom(msg.sender, address(this), _amount);
    // 토큰을 트랜잭션 보낸 계정에서 컨트렉트로 전송
    payable(msg.sender).transfer(etherAmount);
    // Ether 트랜잭션 보낸 계정에게 전송
  }
}
```

- Swap 스마트 컨트렉트는 토큰의 변경을 위해 사용하기 때문에 거래 관련 내용만 존재
- address(스마트 컨트렉트) << 전달된 스마트 컨트렉트의 CA를 가져온다.
