```shell
> mkdir New.No.092
> cd New.No.092
> npm init -y
> npm i truffle
> npm i -D prettier-plugin-solidity
> npx truffle init
```

# ERC20 토큰 구현

## Interface 구현

- 표준에 지키기 위해서 선언을 먼저 해두자.
- typescript에서 했던 것과 마찬가지로 정의를 하지 않고 선언만
- file 명 : IERC20.sol

  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.19;

  interface IERC20 {
    function totalSupply() external view returns (uint);

    // 토큰(코인)의 총 수량

    function balanceOf(address account) external view returns (uint);

    // 지갑 계정의 잔액(토큰)

    function transfer(address recipient, uint amount) external returns (bool);

    // 토큰(코인) 보내기

    function allowance(address owner, address spender) external returns (uint);

    // 권한을 위임 받은 토큰을 관리하는 데이터 공간

    function approve(address spender, uint amount) external returns (bool);

    // 권한을 위임하는 메서드

    function transferFrom(
      address spender,
      address recipient,
      uint amount
    ) external returns (bool);

    // 권한을 위임 받은 토큰에 대해 거래(보내기)

    event Transfer(address indexed from, address indexed to, uint amount);
    // 거래 시 기록하는 이벤트
    event Approval(address indexed owner, address indexed spender, uint amount);
    // 권한 위임 시 기록하는 이벤트
  }
  ```

  - totalSupply() : 토큰의 총 수량 반환
  - balanceOf(account) : 지갑 계정(account)의 잔액 반환
  - transfer(recipient, amount) : 수령인(recipient)에게 n(amount)개의 토큰을 보낸다. 트랜잭션 발생
  - allowance(owner, spender) : 현재 지갑 계정(owner)이 다른 누구(다른 지갑 계정 | CA)(spender)에게 얼마의 토큰에 대한 권한을 줬는지 반환
  - approve(spender, amount) : allowance에서 확인할 수 있는 권한 위임을 실행하는 메서드, 누구(spender)에게 얼마(amount)만큼의 토큰에 대한 권한을 위임
  - transferFrom(spender, recipient, amount) : 위임 받은 지갑 계정(spender)이 누구(recipient)에게 얼마(amount)만큼의 토큰을 보낸다.
  - Transfer(from, to, amount) : 누가(from) 누구(to)에게 얼마(amount)만큼의 토큰을 보냈는지 기록
  - Approval(owner, spender, amount) : 누가(owner) 누구(spener)에게 얼마(amount)만큼의 토큰에 대한 권한을 위임했는지 기록

### 추가 설명

- 메서드 옵션
  - external : 해당 스마트 컨트렉트 내부에서 호출하지 못하고 외부에서만 호출할 수 있도록 설정
  - internal : 해당 스마트 컨트렉트 외부에서 호출하지 못하고 내부에서만 호출할 수 있도록 설정
    - external과 internal은 가시성이라고 부르고 외부에서 보이는지, 내부에서 보이는지를 설정
  - view : 해당 스마트 컨트렉트의 변수(데이터)를 사용할 수 있지만 수정하지 못하도록 설정
  - pure : 해당 스마트 컨트렉트의 변수(데이터)를 사용할수도 수정할수도 없도록 설정
    - view와 pure는 외부에서 호출 시 gas를 소모하지 않는다.
- event 옵션
  - indexed : 이벤트를 받아올 시 검색 또는 필터링 할 수 있도록 설정
    - mySQL에서의 index와 같다.
