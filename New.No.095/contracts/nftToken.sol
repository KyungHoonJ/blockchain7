// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract NftToken is ERC721Enumerable, Ownable {
  uint public constant MAX_TOKEN_COUNT = 1000;
  uint public mint_price = 1 ether;
  string public metadataURI;
  struct TokenData {
    uint Rank;
    uint Type;
  }
  mapping(uint => TokenData) public TokenDatas;
  uint[4][4] public tokenCount;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _metadataURI
  ) ERC721(_name, _symbol) {
    metadataURI = _metadataURI;
  }

  function tokenURI(
    uint _tokenId
  ) public view override returns (string memory) {
    string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
    string memory Type = Strings.toString(TokenDatas[_tokenId].Type);
    return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
  }

  function mintToken() public payable {
    require(msg.value >= mint_price);
    require(MAX_TOKEN_COUNT > ERC721Enumerable.totalSupply());

    uint tokenId = ERC721Enumerable.totalSupply() + 1;

    TokenData memory random = getRandomTokenData(msg.sender, tokenId);
    TokenDatas[tokenId] = random;
    tokenCount[random.Rank - 1][random.Type - 1] += 1;

    payable(Ownable.owner()).transfer(msg.value);
    _mint(msg.sender, tokenId);
  }

  function getRandomTokenData(
    address _owner,
    uint _tokenId
  ) private pure returns (TokenData memory) {
    uint randomNum = uint(keccak256(abi.encodePacked(_owner, _tokenId))) % 100;

    TokenData memory data;

    if (randomNum < 5) {
      data.Rank = 4;
      if (randomNum == 1) {
        data.Type = 1;
      } else if (randomNum == 2) {
        data.Type = 2;
      } else if (randomNum == 3) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else if (randomNum < 13) {
      data.Rank = 3;
      if (randomNum < 7) {
        data.Type = 1;
      } else if (randomNum < 9) {
        data.Type = 2;
      } else if (randomNum < 11) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else if (randomNum < 37) {
      data.Rank = 2;
      if (randomNum < 19) {
        data.Type = 1;
      } else if (randomNum < 25) {
        data.Type = 2;
      } else if (randomNum < 31) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    } else {
      data.Rank = 1;
      if (randomNum < 52) {
        data.Type = 1;
      } else if (randomNum < 68) {
        data.Type = 2;
      } else if (randomNum < 84) {
        data.Type = 3;
      } else {
        data.Type = 4;
      }
    }

    return data;
  }

  function setMetadataURI(string memory _uri) public onlyOwner {
    metadataURI = _uri;
  }

  function getTokenRank(uint _tokenId) public view returns (uint) {
    return TokenDatas[_tokenId].Rank;
  }

  function getTokenType(uint _tokenId) public view returns (uint) {
    return TokenDatas[_tokenId].Type;
  }

  function getTokenCount() public view returns (uint[4][4] memory) {
    return tokenCount;
  }
}
