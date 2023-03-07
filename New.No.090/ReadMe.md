# Truffle, React, Express 기본 세팅

- 파일 설정

  ```bash
  cd New.No.090
  yarn create react-app front
  mkdir back
  cd back
  npm init -y
  npm i -D prettier-plugin-solidity
  npm i truffle express web3 cors
  npx truffle init
  cd ../front
  yarn add web3 axios
  ```

  - -y를 붙일 경우 생성에 필요한 것들을 자동으로 완료한다.
    - Node.js의 경우 init 시 프로젝트명, 라이센스 등의 입력이 필요하지만 -y 옵션을 사용 시 기본값으로 처리하여 완료한다.
    - apt-get install의 경우 프로그램 설치 시 사용자의 동의가 필요하지만 해당 동의를 미리 -y 옵션으로 추가하여 중간에 멈추지 않고 설치를 완료한다.

- FrontEnd에서 web3 연결
  - useWeb3.js 파일 작성
  - Custom Hook으로 사용
- BackEnd에서 express 작성

  ```js
  const express = require("express");
  const web3 = require("web3");
  const cors = require("cors");

  const app = express();
  const web3 = new Web3("http://localhost:8545");

  app.use(cors({ origin: true, credentials: true }));
  // origin : true => 모든 주소에 대해서 cors 무시(\*과 같다)
  app.use(express.json());

  app.listen(8080, () => {
    console.log("8080 server open");
  });
  ```

# 투표 DApp

- back/contracts에 Vote.sol 파일 작성

  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.18;

  contract Vote {
    string[] public candidateList;
    // 투표 목록
    mapping(string => uint) public votesReceived;
    // 투표 목록에 대한 투표 수

    constructor(string[] memory candidateNames) {
        candidateList = candidateNames;
      }
    }

    function totalVotesFor(string memory candidate) public view returns (uint) {
      // 투표수 받아오기
      return votesReceived[candidate];
    }

    function voteForCandidate(string memory candidate) public {
      // 투표하기
      votesReceived[candidate] += 1;
    }

    function candidates() public view returns (string[] memory) {
      // 투표 전체 목록 받아오기
      return candidateList;
    }
  ```

  - mapping(키 => 값) 옵션 이름
    - 이름[키] = 값
    ```js
    const 이름 = { 키: 값 };
    이름[키] = 값;
    ```

- Truffle 사용해서 Compile, Migration

- FrontEnd에서 App.js 작성

## 솔리디티 작성 시 주의사항

- string과 string은 비교가 안된다.

  ```solidity
    function validCandidate(string memory candidate) private view returns (bool) {
      for (uint i = 0; i < candidateList.length; ++i) {
        if (candidateList[i] == candidate) return true;
        // 여기서 에러 발생
      }
      return false;
    }
  ```

  - keccak256으로 해시화 해서 비교를 진행
  - string을 keccak256의 매개변수로 바로 전달하면 유니코드를 제대로 인식하지 못하여 오류 발생
  - abi.encodePacked 메서드를 사용하여 16진수로 변환 후 해시화
  - 아래의 코드로 수정
    ```solidity
    function validCandidate(string memory candidate) private view returns (bool) {
      for (uint i = 0; i < candidateList.length; ++i) {
        if (
          keccak256(abi.encodePacked(candidateList[i])) ==
          keccak256(abi.encodePacked(candidate))
        ) return true;
      }
      return false;
    }
    ```
