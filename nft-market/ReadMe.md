- front

```bash
yarn create react-app front --template typescript
cd front
yarn add web3 axios @metamask/providers
```

- back

```bash
npm init -y
npm i express dotenv @openzeppelin/contracts @remix-project/remixd cors multer @pinata/sdk
npm i -D @types/node nodemon @types/express @types/multer prettier-plugin-solidity tsconfig-paths
```

- typescript

```bash
npm list -g
# typescript, ts-node 없을 시 설치
npm i -g typescript ts-node
```

# Front

- 2023.03.16 Mint | List

# API Server

- 2023.03.16 Mint | List

# Pinata(IPFS)

- 2023.03.16 Mint | List

# Solidity

- 2023.03.17 Mint | List
- 95일차 SaleToken 가져오자

```bash
npx remixd -s . -u https://remix.ethereum.org
```

# Block7 public key

- 블록체인 토이 프로젝트 체크용
- 사용하려면 해라
- feat. 한번에 접속 가능한 유저 수 16

```
API Key: 4085c695b0895f9e8c53
API Secret: c53e443fed4818918077e3e075210d731b62a2702a85337bf2919de596fc7caf
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiMTBmZWE4OS0wZWQ3LTRlYmYtODI4Zi0xN2E3YTYzZDI0YTAiLCJlbWFpbCI6InJ1ZGVrcHVwcHlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQwODVjNjk1YjA4OTVmOWU4YzUzIiwic2NvcGVkS2V5U2VjcmV0IjoiYzUzZTQ0M2ZlZDQ4MTg5MTgwNzdlM2UwNzUyMTBkNzMxYjYyYTI3MDJhODUzMzdiZjI5MTlkZTU5NmZjN2NhZiIsImlhdCI6MTY3OTM4NzY5Nn0.kUDHazEYhlVrk7R_v6NK1jFzs9zOEJ6jce3b_cTzwsA
```

# AWS Public Ganache Data

- URL : http://ganache.test.errorcode.help:8545
- Private Key : c8572b893caf2575a152d8dde6fc11b52dca1ec3e62172b90c4f45ad88654b27
- 양심적으로 갖다쓰자.
- chainId : 6843843813874
