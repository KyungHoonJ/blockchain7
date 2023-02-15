# React + Node.js(Express) Server All in One

## 1. React Project 설치할 폴더 이동

```sh
cd C:/Users/kga-00/Documents/GitHub/blockchain7/New.No.083/board
```

## 2. React Project 설치

- 설치는 폴더 기준으로

  - 현재는 "C:/Users/kga-00/Documents/GitHub/blockchain7/New.No.083/board"

    ```sh
    yarn create react-app ./
    ```

## 3. 라이브러리 설치

```sh
yarn add express dotenv express-session cookie-parser morgan styled-components react-router-dom mysql2 sequelize sequelize-cli axios cors
yarn add -D npm-run-all nodemon
```

- Express Server
  - express : Node.js의 HTTP 서버 구현
  - dotenv : .env 폴더 자동 파싱, process 객체에 env 프로퍼티에 추가
  - express-session : express 서버용 session 라이브러리
  - cookie-parser : Front End에서 보내온 쿠키 자동 파싱
  - morgan : 테스트 로그 작성용
  - mysql2 : Sequelize와 함께 사용하는 mySQL 라이브러리
  - sequelize : DB 파싱용 라이브러리
  - sequelize-cli : sequelize 명령어 라이브러리
  - cors : Cross Origin Resource Sharing 문제 해결
- React
  - react-router-dom : React에서 Router 사용하기 위한 라이브러리
  - axios : Back End와 API 통신을 하기 위한 Front End 라이브러리
- Dev
  - nodemon : Node.js 실행 시 파일 수정에 대해 즉각적인 적용 라이브러리
  - npm-run-all : 여러 서버를 한번에 실행하기 위한 라이브러리

## 4. Sequelize 기본 설정 설치

```sh
cd server
npx sequelize init
```

---

```sh
yarn start # in board
npx nodemon index # in board/server
```
