// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Fundraising {
  uint256 public targetAmount;
  address public owner;
  mapping(address => uint256) public donations;
  uint256 raisedAmount;
  uint256 public finishTime;

  constructor(
    uint256 _targetAmount,
    uint _weeks,
    uint _days,
    uint _hours,
    uint _minutes,
    uint _seconds
  ) {
    targetAmount = _targetAmount;
    owner = msg.sender;
    raisedAmount = 0;
    finishTime =
      block.timestamp +
      _weeks *
      1 weeks +
      _days *
      1 days +
      _hours *
      1 hours +
      _minutes *
      1 minutes +
      _seconds *
      1 seconds;
  }

  receive() external payable {
    require(block.timestamp < finishTime, "This funding is over");

    donations[msg.sender] += msg.value;
    raisedAmount += msg.value;
  }

  function withdrawDonations() external payable {
    require(msg.sender == owner, "Funds will only be released to the owner");
    require(raisedAmount >= targetAmount, "The funding did not reach the goal");
    require(block.timestamp > finishTime, "This funding is not over yet");

    payable(owner).transfer(raisedAmount);
  }

  function refund() external payable {
    require(block.timestamp > finishTime, "This funding is not over yet");
    require(raisedAmount < targetAmount, "The Funding did reached the goal");
    require(donations[msg.sender] > 0, "You did not donate to this funding");

    uint256 toRefund = donations[msg.sender];
    donations[msg.sender] = 0;
    payable(msg.sender).transfer(toRefund);
  }

  function cancelFund() external payable {
    require(block.timestamp < finishTime, "This funding is over");
    require(donations[msg.sender] > 0, "You did not donate to this funding");

    uint256 toRefund = donations[msg.sender];
    donations[msg.sender] = 0;
    raisedAmount -= toRefund;
    payable(msg.sender).transfer(toRefund);
  }

  function getDonation() external view returns (uint256) {
    return donations[msg.sender];
  }
}
