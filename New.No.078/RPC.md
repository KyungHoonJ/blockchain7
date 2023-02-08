# RPC

- Remote Procedure Call의 약자, 원격 프로시저 호출
- 별도의 코딩 없이 다른 공간에서 함수 등을 호출할 수 있는 통신 기술
- 어제 우리가 IPC를 사용해서 사용했었던 admin, eth, miner 등이 있다.

# IPC 파일이 아닌 HTTP 통신으로 조작하기

## geth를 HTTP 통신으로 사용할 수 있도록 실행

- HTTP 통신을 사용하기 때문에 port가 열려있으면 외부에서 조작 가능

```sh
geth --datadir ~/myGeth --http --http.addr "0.0.0.0" --http.port 8080 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --allow-insecure-unlock --syncmode full --networkid 50
```

- datadir : 개인 이더리움 네트워크 데이터 저장 폴더
- http : HTTP 서버를 배포, IPC로 조작하던 개인 이더리움 네트워크를 HTTP 통신으로 조작
- http.addr : 요청 가능한 IP 주소 설정, 기본값 127.0.0.1(로컬/localhost), 0.0.0.0은 모든 IP 주소 허용
- http.port : 요청 가능한 port 설정, 기본값 8545
- http.corsdomain : CORS에 대한 설정, 와일드카드(\*) 사용 가능
- http.api : 사용 가능한 RPC를 설정, 기본값 eth,net,web3
- networkid : 개인 이더리움 네트워크 아이디, 체인 아이디와 같게 설정
- allow-insecure-unlock : HTTP 통신으로 계정을 열 수 있게 한다.(unlock)(공식 홈페이지에서 전문가 이외에 권장하지 않는다.)
- syncmode : 피어 연결 시 동기화 방법 설정
  - fast : 블록 헤더, 최신 1024개의 트랜잭션 동기화, 기본값
  - full : 모든 데이터 동기화
  - light : 블록 헤더, 잔액 관련만 동기화

## geth에 HTTP 통신으로 연결

```sh
geth attach http://localhost:8080
```

# attach로 연결한 곳에서 입력

## 계정 생성

```sh
personal.newAccount()
```

## 계정 풀기(unlock)

```sh
personal.unlockAccount(eth.accounts[0])
```

# geth에 HTTP 통신으로 요청

- attach 하지 않고 HTTP 통신을 사용한다.

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_accounts", "params": []}' http://localhost:8080
```

- X : 통신에 사용하는 method
- H : header
- data : 보내는 요청 body
  - id : 체인 아이디
  - jsonrpc : json 사용하는 RPC의 버전
  - method : 이더리움의 호출 메서드명
  - params : 메서드의 인자값(매개변수)

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": [
    "0x7c3b9dec66ebc1326f5484dc958eacd1bb1dee1c",
    "0x79a88ed4412390bc291f48aa973495ef8ab2fc8b",
    "0xa6a26f267ffad898d957a6d815a9a79c893582e7"
  ]
}
```

- 새로운 계정 생성

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "personal_newAccount", "params":["password"]}' http://localhost:8080
```

    - "password"를 비밀번호로 사용해서 계정 생성

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0xee51c13b2928b5a46857a145e849414ea42708b0"
}
```

- 계정 언락

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": ["0x7c3b9dec66ebc1326f5484dc958eacd1bb1dee1c", "asdfqwer1234"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true }
```

- 채굴 보상 받을 지갑 주소 설정

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0x7c3b9dec66ebc1326f5484dc958eacd1bb1dee1c"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": true }
```

- 채굴 시작

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_start", "params": [1]}' http://127.0.0.1:8080
```

    - miner.start(1) << 매개변수는 쓰레드를 하나만 사용한다.
      - thread : CPU의 작업 최소 단위

```json
{ "jsonrpc": "2.0", "id": 50, "result": null }
```

- 채굴 중지

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "miner_stop", "params": []}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": null }
```

- 잔액 조회

```sh
curl -X POST -H "content-type:application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0x7c3b9dec66ebc1326f5484dc958eacd1bb1dee1c", "latest"]}' http://localhost:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": "0x78903338be34c0000" }
```

    - 잔액을 16진수로 받고있다.

- txpool

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "txpool_content"}' http://127.0.0.1:8080
```

```json
{ "jsonrpc": "2.0", "id": 50, "result": { "pending": {}, "queued": {} } }
```

- 트랜잭션 보내보자

```sh
curl -X POST -H "content-type: application/json" --data '{"id": 50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params": [{"from": "0x7c3b9dec66ebc1326f5484dc958eacd1bb1dee1c", "to": "0x79a88ed4412390bc291f48aa973495ef8ab2fc8b", "value": "0x3B9ACA00", "gas": "0x15f90", "gasPrice":"0x430e23400"}]}' http://localhost:8080
```

    - 아래는 선택사항, 안넣어도 됨
        - gas : 내가 이 트랜잭션에 사용한 수수료
        - gasPrice : 가스당 가격(수수료 가격을 결정)

```json
{
  "jsonrpc": "2.0",
  "id": 50,
  "result": "0xa6abadd2686bc394a3da30e5c302ea4d9cca7d0355ee2b9e0b0d12ce80560fc9"
}
```
