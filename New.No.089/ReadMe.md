```bash
npm init -y
npm i truffle
npm i -D prettier-plugin-solidity
npx truffle init
```

# Solidity 문법

- 타입(자료형)

  - int : 정수
  - string : 문자열
  - \*\*\*[] : 배열
  - address : 주소(지갑 계정 주소 | CA)

- msg.sender : 보낸 지갑 계정

- mapping : Javascript의 객체와 비슷하다.

  - 형식은 mapping(키 => 값) 매핑이름
  - hashMap, 키는 저장되지 않는다.
  - hashMap은 키를 hash화하여 해당 메모리주소에 값을 저장한다.
  - hash 방식은 keccak256을 사용

    ```js
    let test = [];
    test[2414213] = "saresavr";
    test["키의 hash"] = "값";
    test["키의 hash"] = "값1";
    ```

- constructor에 매개변수 전달

  - 함수의 매개변수 저장 위치
    - 옵션 명
      - storage : 블록체인 네트워크에 저장하여 공유된다.
      - memory : 함수 내에서만 사용하고 버린다.
    - 구조체(struct), 배열(array), 매핑(mapping)에 사용해야 한다.
      - int는 정수형 타입으로 배열로 나타낼 수 없다.
      - string은 문자열로 배열과 같이 메모리를 사용한다.
  - 1_deploy_Test.js에서 매개변수 전달
    ```js
    deployer.deploy(Test, "asdf?");
    ```

- 배포한 지갑 주소 확인하기

```bash
npx truffle console
Test.deployed().then(instance => test = instance)
test.owner()
web3.eth.getTransactionReceipt('0x4f4b045924143dc15b5a4b0bde7f09917cc9402ee270a5a0a69c8c145970109d')
```

- web3.eth.getTransactionReceipt('트랜잭션 해시')

```js
const deployed = new web3.eth.Contract(abi, CA);
// deployed, 이미 배포된 스마트 컨트렉트 정보를 가져온다.
```

- Test 객체가 이미 abi와 CA를 갖고있다.
  - Test의 deployed 메서드를 호출하면 위의 JS 코드처럼 배포된 스마트 컨트렉트 정보를 가져온다. 단, Promise 형식이다.
  - Promise 형식에 따라 then을 사용하여 배포된 스마트 컨트렉트를 가져오는데 성공하면 가져온 객체를 test에 정의한다.
  - 이후 test로 스마트 컨트렉트의 메서드, 변수들을 호출할 수 있다.

## MIT 라이센스

- 미국 매사추세츠 공과대학교(MIT)에서 학교 학생들을 돕기 위해 개발한 라이센스

# 간단한 토큰 구현

- 토큰은 Ethereum 기반이다.
  - ERC20, ERC721, ERC1155 << 많이 알려진 토큰
    - ERC20(FT)
    - ERC721(NFT) : 하나의 NFT는 하나의 소유자를 갖는다.
    - ERC1155(NFT) : 하나의 NFT는 다수의 소유자를 갖는다.
  - ERC223, ERC 621, ERC777
- 가장 기본적인 토큰으로 ERC20이라고 한다.
  - Ethereum Request for Comment 20
  - 이더리움 블록체인 네트워크에서 정한 표준 토큰
  - 스마트 컨트렉트로 생성
- FT / NFT
  - FT : Fungible Token / 대체 가능한 토큰
  - NFT : Non Fungible Token / 대체 불가능한 토큰
- 아래의 코드는 내용을 최소화하여 완벽히 작동되지는 않는다.

```solidity
  mapping(address => uint256) public balances;
  string public name;
  string public symbol;
  uint8 public decimals;
  uint public totalSupply;
```

- balances : 각 지갑 계정에 대한 잔액
- name : 토큰 이름(Ether)
- symbol : 토큰 단위(ETH)
- decimals : 소수점의 개수(10의 -몇 승인가?, wei와 ether의 관계)
- totalSupply : 총 발행량

```solidity
function balanceOf(address _owner) public view returns (uint balance) {
  return balances[_owner];
}
```

- view : 함수에서 변수를 호출하지만 수정하진 못한다.(js의 const 변수로 사용하는 느낌)

- 잔액 보내기

```solidity
function transfer(address _to, uint _value) public returns (bool success) {
  require(balances[msg.sender] >= _value);
  balances[msg.sender] -= _value;
  // 문제가 없을 시 트랜잭션을 보낸 사람에게서 _value만큼 돈을 빼고
  balances[_to] += _value;
  // to, 즉 받는 사람에게 _value만큼 돈을 더한다.
  return true;
}
```

- require : 조건을 확인하여 에러를 발생하거나 코드를 계속 진행한다.
  - 첫번째 매개변수로 조건을 전달하며 해당 조건이 true면 계속 진행, false면 중단한다.
  - 두번째 매개변수로 에러 발생 시 출력할 로그를 전달한다.
