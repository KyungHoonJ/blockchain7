// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
  string[] public candidateList;
  mapping(string => uint) public votesReceived;

  constructor(string[] memory candidateNames) {
    candidateList = candidateNames;
  }

  function totalVotesFor(string memory candidate) public view returns (uint) {
    return votesReceived[candidate];
  }

  function voteForCandidate(string memory candidate) public {
    votesReceived[candidate] += 1;
  }

  function candidates() public view returns (string[] memory) {
    return candidateList;
  }
}
