// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC20.sol";

contract ERC20 is IERC20 {
  string public name;
  string public symbol;
  uint8 public decimals = 18;

  uint public override totalSupply;
  mapping(address => uint) public balances;
  mapping(address => mapping(address => uint)) public override allowance;

  function balanceOf(address account) external view override returns (uint) {
    return balances[account];
  }

  function transfer(
    address recipient,
    uint amount
  ) external override returns (bool) {
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
    emit Transfer(msg.sender, recipient, amount);
    return true;
  }

  function approve(
    address spender,
    uint amount
  ) external override returns (bool) {
    allowance[msg.sender][spender] = amount;
    emit Approval(msg.sender, spender, amount);
    return true;
  }

  function transferFrom(
    address sender,
    address recipient,
    uint amount
  ) external override returns (bool) {
    require(allowance[sender][msg.sender] >= amount);
    allowance[sender][msg.sender] -= amount;
    balances[sender] -= amount;
    balances[recipient] += amount;
    emit Transfer(sender, recipient, amount);
    return true;
  }

  function mint(uint amount) internal {
    balances[msg.sender] += amount;
    totalSupply += amount;
    emit Transfer(address(0), msg.sender, amount);
  }

  function burn(uint amount) external {
    balances[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
  }
}
