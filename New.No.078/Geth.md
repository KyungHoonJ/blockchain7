# Geth 추가 설명

- datadir 옵션을 사용하지 않았을 때 네트워크 정보는 어디에 저장되는가?

  - Linux : ~/.ethereum
  - Mac : ~/Library/Ethereum (기본 숨긴 폴더)

- Looking for peers 는 왜 계속 나오는가?
  - peer가 충분히 연결되지 않으면 계속 peer를 추가하도록 시도한다.
  - 기본 최대 피어 수는 50개
