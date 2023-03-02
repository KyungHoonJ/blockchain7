// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Counter {
  int256 private count;

  constructor() {
    count = 0;
  }

  function getCount() public view returns (int256) {
    return count;
  }

  function increment() public {
    count += 1;
  }

  function decrement() public {
    count -= 1;
  }
}
