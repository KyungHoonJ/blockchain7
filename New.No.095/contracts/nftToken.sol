// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Strings.sol";

contract nftToken is ERC721Enumerable, Ownable {
  uint public constant MAX_TOKEN_COUNT = 1000;
  uint public mint_price = 1 ether;
  string public metadataURI;
  struct TokenData {
    uint Rank;
    uint Type;
  }
  mapping(uint => TokenData) public TokenDatas;
  uint[4][4] public tokenCount;

  function tokenURI(
    uint _tokenId
  ) public view override returns (string memory) {
    string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
    string memory Type = Strings.toString(TokenDatas[_tokenId].Type);
    return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
  }
}
