// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721 {
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint indexed _tokenId
  );
  event Approval(
    address indexed _from,
    address indexed _approved,
    uint indexed _tokenId
  );
  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );

  function balanceOf(address _owner) external view returns (uint balance);

  function ownerOf(uint _tokenId) external view returns (address owner);

  function transferFrom(address _from, address _to, uint _tokenId) external;

  function approve(address _to, uint _tokenId) external;

  function setApprovalForAll(address _operator, bool _approved) external;

  function getApproved(uint _tokenId) external view returns (address operator);

  function isApprovedForAll(
    address _owner,
    address _operator
  ) external view returns (bool);
}
