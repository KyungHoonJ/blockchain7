// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Test {
  string text;

  constructor() {
    text = "Hi Block7";
  }

  function getText() public view returns (string memory) {
    return text;
  }

  function setText(string memory _value) public {
    text = _value;
  }
}
