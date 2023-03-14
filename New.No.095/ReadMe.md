```bash
mkdir New.No.095
cd New.No.095
npm init -y
npm i truffle @openzeppelin/contracts
npm i -D prettier-plugin-solidity
npx truffle init
```

# OpenSea 등 NFT 마켓에서 사용하는 컨트렉트

- NFT 토큰 컨트렉트 구현 => nftToken

  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.19;

  import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
  // ERC721 기본 컨트렉트
  import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
  // owner 관련 컨트렉트, _owner 등을 추가한다.
  import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

  // toString을 위한 라이브러리
  // - 기존에 int, uint 등을 string화 하려면 byte로 바꿨다가 변경해야한다.
  // - Strings 라이브러리는 위 기능을 편하게 제공한다.

  contract nftToken is ERC721Enumerable, Ownable {
    // ERC721 기본 구현과 owner를 상속한다.

    uint public constant MAX_TOKEN_COUNT = 1000;
    // NFT 최대 발행량
    // constant << Javascript에서의 const, 바뀌지 않는 변수(상수)
    // 상수의 변수명을 정할 때 전부 대문자로 하곤 한다.

    uint public mint_price = 1 ether;
    // 민팅 가격, 사용자가 NFT를 올릴 때마다 1 이더씩 받는다.
    // ether, gwei, second, minute, day << 단위를 사용할 수 있다.
    // ether 경우 10 ** 18

    string public metadataURI;
    // NFT의 tokenId 값에 매칭되는 tokenURI의 앞부분
    // Webpage 구현에서의 baseURL과 같은 기능

    struct TokenData {
      // 토큰의 데이터
      // 현재 구현된 코드에서는 랜덤하게 넣을 예정
      uint Rank;
      uint Type;
    }
    // - OpenSea에서 attributes에 출력된다.
    //   - attributes에 출력되는 내용에 관해서는 아래의 주소를 참조
    //     - https://docs.opensea.io/docs/metadata-standards#attributes

    mapping(uint => TokenData) public TokenDatas;
    // tokenId => TokenData

    uint[4][4] public tokenCount;

    // 토큰 데이터에 따른 NFT 토큰 발행량 확인용, [Rank][Type]
    // 4 * 4 이중배열
    // [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

    function tokenURI(
      uint _tokenId
    ) public view override returns (string memory) {
      // tokenURI를 생성 메서드
      // ERC721에 virtual 옵션을 포함하여 구현되어있음
      string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
      string memory Type = Strings.toString(TokenDatas[_tokenId].Type);
      return
        string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
    }
  }
  ```
