// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BreadShop {
  mapping(address => uint) public breads;

  function buyBread() public payable {
    require(msg.value >= 10 ** 18);
    // if (msg.value > 2 * 10 ** 18) {
    //   payable(msg.sender).transfer(2 * 10 ** 18 - msg.value);
    // }
    breads[msg.sender] += 1;
  }

  function sellBread(uint amount) public payable {
    breads[msg.sender] -= 1;
    payable(msg.sender).transfer(amount * 10 ** 18);
  }

  function getBread() public view returns (uint) {
    return breads[msg.sender];
  }

  function getSender() public view returns (address) {
    return msg.sender;
  }
}
