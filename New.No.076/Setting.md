# GETH를 위한 세팅

- geth : Go로 구현된 이더리움 서버

# Golang

- Google에서 개발한 프로그래밍 언어(컴파일 언어)
- 이름은 Go 이지만 검색 등에서 불편해서 Golang이라고 부른다.
- 설치

```sh
sudo apt-get install golang
# Mac OS
brew install golang
```

- 버전 확인

```sh
go version
```

- 아래의 프로그램들을 함께 설치하자
  - libgmp3-dev : 다중 정밀도 산술 라이브러리
  - tree : 디렉토리를 tree 형태로 보여준다.
    - 잘못 사용하면 지옥을 볼지도?
  - make : 통합 컴파일러, 다양한 언어에 대해서 알아서 build를 해준다.
  - build-essential : build에 필요한 기본 라이브러리들을 제공
  ```sh
  sudo apt-get install libgmp3-dev tree make build-essential
  # Mac OS
  brew install tree make
  ```

# Go-Ethereum

- Geth
- 이더리움에서 제공하는 공식 소프트웨어
- 설치
  - geth 폴더 생성 후 거기에

```sh
git clone https://github.com/ethereum/go-ethereum
```

- 빌드

  - go-ethereum 폴더에서 실행

  ```sh
  make geth
  ```

- geth 실행
  - go-ethereum/build/bin 폴더 내의 geth 실행

```sh
./geth
```

# 생성한 geth를 위치에 상관없이 명령어로 사용할 수 있도록 하자

- pwd로 확인한 geth의 경로
  - /home/jkh/geth/go-ethereum/build/bin
- 파일 하나를 만들자.
  - 이름은 .bash_profile
  - 방법은 vi
  ```sh
  vi ~/.bash_profile
  ```
  - 내용은 아래와 같다. => i를 눌러서 수정모드로
  ```
  export PATH=$PATH:/home/jkh/geth/go-ethereum/build/bin
  ```
  - 수정 완료 시 esc => :wq! => 엔터
- 아래의 명령어를 입력하면 완료

```sh
source ~/.bash_profile
```

- 이후에 어디서든지 geth 명령어로 geth 실행 가능
