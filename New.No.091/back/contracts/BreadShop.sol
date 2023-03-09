// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// 빵 가격 정의, 컨트렉트 등록자는 수정 가능
// 구매하는 빵 개수에 따라 자동으로 사용되는 Ether 정의
// 구매할 때와 판매할 때 가격 변동 => 구매보다 판매할때 무조건 싸야함 << 남는 돈은 스마트 컨트렉트가 꿀꺽
// - 해보고 싶은 사람 해보자 성진이는 필수
//   - 따로 풀이 없음(git 확인), 질문은 받음

contract BreadShop {
  mapping(address => uint) public breads;

  function buyBread() public payable {
    require(msg.value >= 10 ** 18);
    // if (msg.value > 2 * 10 ** 18) {
    //   payable(msg.sender).transfer(2 * 10 ** 18 - msg.value);
    // }
    breads[msg.sender] += 1;
  }

  function sellBread() public payable {
    breads[msg.sender] -= 1;
    payable(msg.sender).transfer(10 ** 18);
  }

  function getBread() public view returns (uint) {
    return breads[msg.sender];
  }

  function getSender() public view returns (address) {
    return msg.sender;
  }
}
