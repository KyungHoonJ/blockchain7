// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Vote {
  string[] public candidateList;
  mapping(string => uint) public votesReceived;
  event Voted(string candidate, uint votes);

  constructor(string[] memory candidateNames) {
    candidateList = candidateNames;
  }

  function validCandidate(string memory candidate) private view returns (bool) {
    for (uint i = 0; i < candidateList.length; ++i) {
      if (
        keccak256(abi.encodePacked(candidateList[i])) ==
        keccak256(abi.encodePacked(candidate))
      ) return true;
    }
    return false;
  }

  function validCandidatePure(
    string memory candidate,
    string[] memory _candidateList
  ) private pure returns (bool) {
    for (uint i = 0; i < _candidateList.length; ++i) {
      if (
        keccak256(abi.encodePacked(_candidateList[i])) ==
        keccak256(abi.encodePacked(candidate))
      ) return true;
    }
    return false;
  }

  function totalVotesFor(string memory candidate) public view returns (uint) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(string memory candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
    emit Voted(candidate, votesReceived[candidate]);
  }

  function candidates() public view returns (string[] memory) {
    return candidateList;
  }
}
