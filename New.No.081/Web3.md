# Web3

- World Wide Web의 세대 중 하나

## Web1

- World Wide Web의 1세대
- html를 사용한 정적 웹페이지
- DB가 없이 파일에 데이터를 저장 => 사용자가 데이터를 수정하기 힘들었다. => 웹페이지 운영자가 주는 정보만 받을 수 있었다.
- GIF 파일을 사용한 버튼과 그래픽을 사용
  => 읽기 전용 웹

## Web2

- World Wide Web의 2세대
- 데이터를 일괄적으로 검색, 분류가 가능 => 위키백과 등
- 사용자의 입력에 따라 웹페이지가 변화 => 사용자가 데이터를 수정하기 용이했다. => 블로그
- API 통신 사용
  => 참여형 소셜 웹

## Web3

- 3D 그래픽, 탈중앙화(블록체인) 등
- 사용자의 검색 / 분석을 통해 컨텐츠를 생성 / 공유 / 연결
- 중간자를 통해 공개 || 비공개로 사용할 수 있어서 신뢰할 수 없는 데이터를 제공 => 개인 정보를 더 안전하게 저장 가능
  => 읽고 쓰고 실행하는 웹
  => 현재 나오고, 발전하고 있는 모든 기술을 포함한다 => 개념이 애매하다.

# Metamask in Javascript

- Web3 라이브러리를 사용하기 전에 메타마스크에서 기본적으로 제공해주는 객체부터 사용해보자.

  - 블록체인 네트워크는 가나슈를 사용
    - Ubuntu에서 글씨 색상이 회색이면 아래의 명령어를 실행
    ```sh
    source ~/.bashrc
    ```
  - 아래의 ethereum 객체는 어디까지나 메타마스크 확장 프로그램에 연결된다.

    - 이전까지의 axios 등을 사용한 요청 방식

      ```mermaid
      flowchart
      A[browser]
      B[blockchain network]
      A-->B
      ```

    - ethereum 객체 사용 시 요청 방식

      ```mermaid
      flowchart
      A[browser]
      B[blockchain network]
      C[MetaMask]
      A-->C-->B
      ```

- 메타마스크 객체

  ```js
  console.log(window.ethereum);
  ```

  - 메타마스크 연결 확인

  ```js
  window.ethereum.isConnected();
  ```

  - 이벤트 등록

  ```js
  ethereum.on("connect", (connectInfo) => {
    console.log(connectInfo); // {chainId: '0x539'}
    console.log(parseInt(connectInfo.chainId));
  });
  ```

        - connect : 연결됐을 때 실행

        ```js
        ethereum.on("connect", handler : (connectInfo : {
            chainId : string;
        }) => void)
        ```

        - disconnect : 연결이 끊겼을 때

        ```js
        ethereum.on("disconnect", handler: (error : ProviderRpcError) => void)
        interface ProviderRpcError extends Error{
            code: number;
            data?: unknown;
        }
        ```

        - accountsChanged : 계정 변경되었을 때

        ```js
        ethereum.on("accountsChanged", handler: (accounts:Array<string>) => void)
        ```

        - chainChanged : 블록체인 네트워크(체인) 변경되었을 때

        ```js
        ethereum.on("chainChanged", handler: (chainId: string) => void)
        ```

  - 메타마스크에 RPC 요청

    ```js
    ethereum.request({
      method: "eth_getBalance",
      params: ["0x896BB5BC4c4794307BE0f378b45E341056258c42"],
    });
    ```

    - eth_getBalance

      - 잔액 조회

      ```js
      const args = {
        method: "eth_getBalance",
        params: ["지갑 주소"],
      };
      ```

    - eth_chainId

      - 체인 아이디 조회

      ```js
      const args = {
        method: "eth_chainId",
      };
      ```

    - eth_requestAccounts
      - 메타마스크 확장 프로그램의 계정 조회
      - 보안 정책 상의 문제로 현재 선택한 게정 주소만을 가져온다.
      ```js
      const args = {
        method: "eth_requestAccounts",
      };
      ```
