# Ganache

- 테스트용 로컬 이더리움 네트워크
- 장점
  - Geth 등보다 속도가 빠르다
  - 별 다른 세팅 없이 바로 테스트 가능
  - 기본으로 10개의 계정이 생성되며 각 계정에 100 코인씩 지급된다.
- 단점
  - 채굴해도 보상이 없다.
  - 외부 네트워크 피어로 연결이 안된다.
  - 서버 종료 시 모든 데이터 삭제

## 설치

```sh
npm i -g ganache-cli
```

## 실행

```sh
npx ganache-cli
```

- cli = Commend Line Interface

### options

```sh
-a 100 | --accounts 100 # 서버 시작 시 생성할 계정의 수, 기본값 10
-e 1000 | --defaultBalanceEther 1000 # 서버 시작 시 생성되는 계정의 소지 Ether, 기본값 100
-b 60 | --blockTime 60 # 자동 마이닝 시간 간격, 초 단위, 지정하지 않는 게 좋음
# 기본적으로 트랜잭션 발생 시 마이닝을 바로 진행한다.
-p | --port # 사용할 포트, 기본값 8545
-h | --host | --hostname # 기본 접속 주소, http.addr 랑 같은 기능을 한다고 생각하면 된다. 기본값 127.0.0.1
-g | --gasPrice # wei의 가스 가격, 기본값 20000000000 (20GWei)
-l | --gasLimit # 블록 가스 한도, 기본값 0x6691b7
--chainId # 체인 아이디, 기본값 1337
```

- url= http://localhost:8080
  - http << 프로토콜, protocol
  - localhost << domain, host
  - 127.0.0.1 << ip, host
  - 8080 << port

# RPC

## geth와 같은 RPC

- eth
  - accounts
  - blockNumber
  - coinbase
  - getBalance
  - sendTransaction
- miner
  - start : 자동 마이닝 시작
  - stop : 자동 마이닝 종료
- personal
  - unlockAccount
  - newAccount
  - sendTransaction : eth의 sendTransaction과 같다.

## Ganache 만의 RPC

- evm
  - snapshot : 현재 상태를 저장한다.
  - revert : snapshot으로 상태를 되돌린다. 되돌린 스냅샷 기준으로 이후 스냅샷은 삭제된다.
  - mine : 강제 채굴
  - unlockUnknownAccount : unlockAccount와 같다, 단 비밀번호 없이
  - lockUnknownAccount : lockAccount와 같다, 단 비밀번호 없이
