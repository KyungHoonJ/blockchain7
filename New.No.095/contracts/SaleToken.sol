// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NftToken.sol";

contract SaleToken {
  NftToken public Token;

  constructor(address _tokenAddress) {
    Token = NftToken(_tokenAddress);
  }

  struct TokenInfo {
    uint tokenId;
    uint Rank;
    uint Type;
    uint price;
  }

  mapping(uint => uint) public tokenPrices;
  uint[] public SaleTokenList;

  function SalesToken(uint _tokenId, uint _price) public {
    address tokenOwner = Token.ownerOf(_tokenId);

    require(tokenOwner == msg.sender);
    require(_price > 0);
    require(Token.isApprovedForAll(msg.sender, address(this)));

    tokenPrices[_tokenId] = _price;
    SaleTokenList.push(_tokenId);
  }

  function PurchaseToken(uint _tokenId) public payable {
    address tokenOwner = Token.ownerOf(_tokenId);

    require(tokenOwner != msg.sender);
    require(tokenPrices[_tokenId] > 0);
    require(tokenPrices[_tokenId] <= msg.value);

    payable(tokenOwner).transfer(msg.value);
    Token.transferFrom(tokenOwner, msg.sender, _tokenId);

    tokenPrices[_tokenId] = 0;
    popSaleToken(_tokenId);
  }

  function cancelSaleToken(uint _tokenId) public {
    address tokenOwner = Token.ownerOf(_tokenId);

    require(tokenOwner == msg.sender);
    require(tokenPrices[_tokenId] > 0);

    tokenPrices[_tokenId] = 0;
    popSaleToken(_tokenId);
  }

  function popSaleToken(uint _tokenId) private returns (bool) {
    for (uint i = 0; i < SaleTokenList.length; i++) {
      if (SaleTokenList[i] == _tokenId) {
        SaleTokenList[i] = SaleTokenList[SaleTokenList.length - 1];
        SaleTokenList.pop();
        return true;
      }
    }
    return false;
  }

  function getSaleTokenList() public view returns (TokenInfo[] memory) {
    require(SaleTokenList.length > 0);

    TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length);

    for (uint i = 0; i < SaleTokenList.length; i++) {
      uint tokenId = SaleTokenList[i];
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenType(tokenId);
      uint price = tokenPrices[tokenId];

      list[i] = TokenInfo(tokenId, Rank, Type, price);
    }
    return list;
  }

  function getOwnerTokens(
    address _tokenOwner
  ) public view returns (TokenInfo[] memory) {
    uint balance = Token.balanceOf(_tokenOwner);
    require(balance > 0);

    TokenInfo[] memory list = new TokenInfo[](balance);

    for (uint i = 0; i < balance; i++) {
      uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
      uint Rank = Token.getTokenRank(tokenId);
      uint Type = Token.getTokenType(tokenId);
      uint price = tokenPrices[tokenId];

      list[i] = TokenInfo(tokenId, Rank, Type, price);
    }
    return list;
  }

  function getLatestToken(
    address _tokenOwner
  ) public view returns (TokenInfo memory) {
    uint balance = Token.balanceOf(_tokenOwner);
    uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance - 1);
    uint Rank = Token.getTokenRank(tokenId);
    uint Type = Token.getTokenType(tokenId);
    uint price = tokenPrices[tokenId];

    return TokenInfo(tokenId, Rank, Type, price);
  }
}
