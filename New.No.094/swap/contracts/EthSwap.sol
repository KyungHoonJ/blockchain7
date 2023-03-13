// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthSwap {
  ERC20 public token;
  uint public rate = 100;

  constructor(ERC20 _token) {
    token = _token;
  }

  function getToken() public view returns (address) {
    return address(token);
  }

  function getSwapBalance() public view returns (uint) {
    return token.balanceOf(msg.sender);
  }

  function getThisAddress() public view returns (address) {
    return address(this);
  }

  function getMsgSender() public view returns (address) {
    return msg.sender;
  }

  function getTokenOwner() public view returns (address) {
    return token._owner();
  }

  function buyToken() public payable {
    uint256 tokenAmount = msg.value * rate;
    require(token.balanceOf(address(this)) >= tokenAmount);
    token.transfer(msg.sender, tokenAmount);
  }

  function sellToken(uint256 _amount) public payable {
    require(token.balanceOf(msg.sender) >= _amount);
    uint256 etherAmount = _amount / rate;

    require(address(this).balance >= etherAmount);
    token.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);
  }
}
