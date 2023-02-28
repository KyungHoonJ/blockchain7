# Javascript에서 Solidity 컴파일 및 스마트 컨트랙트 실행

- 필요 라이브러리

  ```bash
  npm i solc web3
  ```

- 기존에 썼던 방법

  ```bash
  npx solc --bin --abi ./contracts/Test.sol
  ```

- 코드 설명

```js
const solc = require("solc");
// 솔리디티 코드를 바이트 코드로 변환시켜주는 컴파일 라이브러리
const fs = require("fs");
// FileSystem, 파일에 접근하여 데이터를 가져오거나 파일을 수정, 생성 등의 기능을 제공하는 라이브러리
const path = require("path");
// 경로에 대한 편의 기능을 제공하는 라이브러리
// 사용 이유는 보통 OS에 따른 경로 문자열이 다르기 때문에
//   - Windows OS : C:\Users\kga-00\Documents\GitHub\blockchain7\New.No.086
//   - Linux OS : /mnt/c/Users/kga-00

const contractPath = path.join(__dirname, "contracts", "Test.sol");
// __dirname : 현재 문서의 경로(폴더까지만)
//   - PS : ES6(import, export) 사용 시 __dirname이 없다.
// path.join : 경로를 합쳐서 하나의 문자열로 반환

const data = JSON.stringify({
  // solc를 사용하여 솔리디티 코드를 컴파일 시 사용할 설정
  language: "Solidity",
  // 언어는 솔리디티다. 솔리디티 이외에도 언어가 있으나 솔리디티가 너무 강해서 다른 언어를 거의 사용하지 않는다. yul
  sources: {
    // 파일에 대한 설정
    "Test.sol": {
      // 파일로 생성되는 솔리디티 객체의 이름
      content: fs.readFileSync(contractPath, "utf-8"),
      // 파일 내용(코드)
    },
  },
  settings: {
    // 추가적인 설정
    outputSelection: {
      // 가져올 정보 설정
      "*": {
        // 파일 이름
        "*": ["*"],
        // 가져올 데이터의 키, 값
      },
      // * : 모든 것
      // outputSelection 내용은 '모든 데이터를 전부 가져와라'
    },
  },
});

const compiled = JSON.parse(solc.compile(data));
// 컴파일 후 데이터를 객체화
const abi = compiled.contracts["Test.sol"].Test.abi;
// ABI 추출
const bin = compiled.contracts["Test.sol"].Test.evm.bytecode.object;
// ByteCode 추출
```

---

# Geth에서 생성한 지갑 계정 개인키 가져오기

- 필요 라이브러리

  ```bash
  npm i keythereum
  ```
