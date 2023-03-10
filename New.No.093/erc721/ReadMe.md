# ERC721 구현

## IERC721Metadata 구현

- Metadata란
  - 데이터를 위한 데이터다, 데이터에 대한 데이터다.
  - 데이터에 관한 구조화된 데이터, 다른 데이터를 설명해주는 데이터
    - 사전에서 ㄱ, ㄴ, ㄷ 순으로 나타난다. [ㄱ, ㄴ, ㄷ] << 메타데이터
      - ["가을 : 계절이다.", "사과 : 과일이다.", "책상 : 물건이다."]
      - 메타데이터 : [가나다순, 과일, 계절]

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721Metadata {
  function name() external view returns (string memory);

  function symbol() external view returns (string memory);

  function tokenURI(uint tokenId) external view returns (string memory);
}
```

- URI는 Uniform Resource Identifier의 약자로 특정 데이터를 식별하는 식별자, 리소스를 구분하는 고유 문자열
  - URI : 데이터를 구분한다. | URL : 데이터의 위치를 가리킨다.
  - cmd / window 터미널 등에서 "ipconfig /all" 명령어를 사용
    - 물리적 주소(Mac 주소) : URI | IPv4 : URL

## IERC721 구현

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC721 {
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint indexed _tokenId
  );
  // 토큰 전송 시 이벤트
  event Approval(
    address indexed _from,
    address indexed _approved,
    uint indexed _tokenId
  );
  // 토큰 하나에 대한 권한 위임 시 이벤트
  event ApprovalForAll(
    address indexed _owner,
    address indexed _operator,
    bool _approved
  );

  // 모든 토큰에 대한 권한 위임 시 이벤트
  // _approved가 true면 모든 토큰 권한 위임

  function balanceOf(address _owner) external view returns (uint balance);

  // 소유자의 토큰 총 개수 조회

  function ownerOf(uint _tokenId) external view returns (address owner);

  // 토큰 소유자 조회

  function transferFrom(address _from, address _to, uint _tokenId) external;

  // 토큰 전송

  function approve(address _to, uint _tokenId) external;

  // 토큰 하나에 대한 권한 위임

  function setApprovalForAll(address _operator, bool _approved) external;

  // 모든 토큰에 대한 권한 위임 설정(취소할 수도 있다.)

  function getApproved(uint _tokenId) external view returns (address operator);

  // 토큰에 대한 권한을 위임 받은 계정(대리인)

  function isApprovedForAll(
    address _owner,
    address _operator
  ) external view returns (bool);
  // 모든 토큰에 대한 권한을 위임했는지 확인
}
```

## ERC721 구현

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC721.sol";
// IERC721 가져오기
import "./IERC721Metadata.sol";

// IERC721Metadata 가져오기

contract ERC721 is IERC721, IERC721Metadata {
  // IERC721, IERC721Metadata 상속
  string public override name;
  string public override symbol;
  // IERC721Metadata에서 선언되었기 때문에 override 필요

  mapping(address => uint) private _balances;
  // 소유자의 토큰 총 개수
  mapping(uint => address) private _owners;
  // 토큰에 대한 소유자
  mapping(uint => address) private _tokenApprovals;
  // 토큰을 위임 받은 대리인 | { tokenId : operator }
  mapping(address => mapping(address => bool)) private _operatorApprovals;

  // 모든 토큰에 대한 대리인이 권한을 받았는지 확인 | { owner : { operator : approved } }

  constructor(string memory _name, string memory _symbol) {
    name = _name;
    symbol = _symbol;
  }

  function balanceOf(address _owner) public view override returns (uint) {
    require(_owner != address(0), "ERC721: address zero is not a valid owner");
    // require(확인할 조건, false 시 로그)
    return _balances[_owner];
  }

  // 소유자의 토큰 총 개수

  function ownerOf(uint _tokenId) public view override returns (address) {
    address owner = _owners[_tokenId];
    require(owner != address(0), "ERC721: invalid tokenId");
    return owner;
  }

  // 토큰의 소유자

  function transferFrom(
    address _from,
    address _to,
    uint _tokenId
  ) external override {
    require(_isApproveOrOwner(_from, _tokenId));
    require(_from != _to);

    _beforeTokenTransfer(_from, _to, _tokenId);

    _balances[_from] -= 1;
    _balances[_to] += 1;
    _owners[_tokenId] = _to;

    emit Transfer(_from, _to, _tokenId);
  }

  // 토큰 보내는 메서드, from => to

  function approve(address _to, uint _tokenId) external override {
    address owner = _owners[_tokenId];
    // address owner = ownerOf(_tokenId); << 수수료가 필요하기 때문에 이렇게 사용 안한다.
    // 위임할 토큰의 주인 확인
    // ownerOf 호출 시 gas 소모된다.
    require(_to != owner, "ERC721: approval to current owner");
    // 소유자가 소유자에게 보냈는지 확인
    require(
      msg.sender == owner || isApprovedForAll(owner, msg.sender),
      "ERC721: approve caller is not token owner or approved for all"
    );
    // 트랜잭션을 보낸 계정이 소유자이거나 위임 받은 대리인인지 확인

    _tokenApprovals[_tokenId] = _to;
    // 대리인 설정

    emit Approval(owner, _to, _tokenId);
    // 권한 위임을 로그로 남긴다.
  }

  // _to 에게 _tokenId에 대한 권한을 위임한다.

  function setApprovalForAll(
    address _operator,
    bool _approved
  ) external override {
    require(msg.sender != _operator, "ERC721: approve to caller");
    _operatorApprovals[msg.sender][_operator] = _approved;
    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  // 트랜잭션 보낸 계정의 모든 토큰에 대한 권한을 _operator에게 _approved로 설정한다. | _approved == true << 모든 권한 위임 | _approved == false << 권한 위임 취소

  function getApproved(uint _tokenId) public view override returns (address) {
    require(_owners[_tokenId] != address(0), "ERC721: invalid tokenId");
    return _tokenApprovals[_tokenId];
  }

  // 토큰에 대한 대리인 확인

  function isApprovedForAll(
    address _owner,
    address _operator
  ) public view override returns (bool) {
    return _operatorApprovals[_owner][_operator];
  }

  // 소유주의 토큰에 대해서 대리인이 모든 권한을 갖고있는지 확인

  function _isApproveOrOwner(
    address _spender,
    uint _tokenId
  ) private view returns (bool) {
    address owner = _owners[_tokenId];
    // 토큰 자체가 있는지 확인
    return (_spender == owner ||
      // _from이 소유주인가?
      isApprovedForAll(owner, _spender) ||
      // _from이 토큰에 대해 모든 권한을 갖고있는 대리인인가?
      getApproved(_tokenId) == _spender);
    // _from이 해당 토큰에 대해 권한을 갖고있는 대리인인가?
  }

  // 보내는 계정이 토큰에 대해서 권한이 있는지 확인

  function tokenURI(
    uint tokenId
  ) external view virtual override returns (string memory) {}

  // tokenURI 메서드는 상속받아서 override 했지만 다시 상속해서 재정의할 것이다. => virtual 옵션 추가

  function _mint(address _to, uint _tokenId) public {
    require(_to != address(0));
    // 받는 계정이 있는지 확인

    address owner = _owners[_tokenId];
    require(owner == address(0));
    // 이미 있는 토큰인지 확인

    _beforeTokenTransfer(address(0), _to, _tokenId);

    _balances[_to] += 1;
    _owners[_tokenId] = _to;

    emit Transfer(address(0), _to, _tokenId);
  }

  // 토큰 추가

  function _beforeTokenTransfer(
    address _from,
    address _to,
    uint _tokenId
  ) internal virtual {}
  // 상속 후 구현
}
```

## ERC721Enumerable 구현

- Minting 했을 때 tokenId를 자동으로 생성
- 특정 계정이 소유하고 있는 tokenId를 검색

  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.19;

  import "./ERC721.sol";

  contract ERC721Enumerable is ERC721 {
    uint[] private _allTokens;
    // minting(생성)된 모든 토큰의 ID 배열

    mapping(address => mapping(uint => uint)) private _ownedTokens;
    // 소유자의 토큰의 index와 id
    // { owner : { index : id } }
    mapping(uint => uint) private _ownedTokensIndex;

    // 토큰 id에  대한 index | { tokenId : 소유자 기준의 index }

    constructor(
      string memory _name,
      string memory _symbol
    ) ERC721(_name, _symbol) {}

    function mint(address _to) public {
      // 계정 주소만 받아서 minting, tokenId는 자동 생성(현재 토큰 총 개수)
      _mint(_to, _allTokens.length);
    }

    // mint, transferFrom 메서드에서 호출된다.
    function _beforeTokenTransfer(
      address _from,
      address _to,
      uint _tokenId
    ) internal override {
      if (_from == address(0)) {
        // mint 메서드에서 실행
        _allTokens.push(_allTokens.length);
        // 새로운 토큰 발행 시 모든 토큰 배열에 추가한다.
      } else {
        // transferFrom 메서드에서 실행
        uint latestTokenIndex = ERC721.balanceOf(_from) - 1;
        // 소유자의 토큰의 마지막 index
        uint tokenIndex = _ownedTokensIndex[_tokenId];
        // 보낼 토큰 ID에 대한 소유자 기준의 index
        if (tokenIndex != latestTokenIndex) {
          // 보낼려는 토큰이 마지막 토큰이 아닐 시
          uint latestTokenId = _ownedTokens[_from][latestTokenIndex];
          // 소유자의 마지막 토큰의 ID
          _ownedTokens[_from][tokenIndex] = latestTokenId;
          // 소유자의 (보내는 위치)토큰 index의 ID를 소유자의 마지막 토큰의 ID로 정의
          _ownedTokensIndex[latestTokenId] = tokenIndex;
          // 소유자의 마지막 토큰의 ID의 index를 _tokenId에 대한 index로 수정
        }
        delete _ownedTokens[_from][latestTokenIndex];
        delete _ownedTokensIndex[_tokenId];
        // 소유자 기준의 토큰 삭제
      }
      uint length = ERC721.balanceOf(_to);
      _ownedTokens[_to][length] = _tokenId;
      _ownedTokensIndex[_tokenId] = length;
      // 받는 계정에 토큰 추가
    }

    function totalSupply() public view returns (uint) {
      return _allTokens.length;
    }

    function tokenByIndex(uint _index) public view returns (uint) {
      require(_index < _allTokens.length);
      return _allTokens[_index];
    }

    // 전체 목록 기준의 토큰 index로 토큰 ID 검색

    function tokenOfOwnerByIndex(
      address _owner,
      uint _index
    ) public view returns (uint) {
      require(_index < balanceOf(_owner));
      return _ownedTokens[_owner][_index];
    }
    // 소유자와 소유자 기준의 토큰의 index로 토큰 Id 검색
  }
  ```
