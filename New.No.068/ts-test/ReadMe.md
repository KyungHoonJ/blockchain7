# TypeScript

- 마이크로소프트에서 만든 Javascript 기반 프로그래밍 언어
  - 슈퍼셋? 이라고 부르더라.
- Javascript에 Type, 자료형 확인을 추가한 것

  - number, string, boolean, null, undefined, Array, Object

- 기본적 설치 : npm i -D typescript

  - TypeScript는 바로 실행하는 것이 아닌 Compiler를 사용한다.
  - Compiler로 Javascript로 변환 후 실행한다.
    - Compiler란 우리가 작성한 코드를 컴퓨터가 알 수 있는 언어로 변환한다.
    - 대표적으로 C++, C#, Java 등에서 사용한다.
    - TypeScript는 브라우저, node.js에서 바로 사용할 순 없다.

- 명령어 tsc(TypeScript Compiler)를 사용한다.

  - tsc -v : 버전을 확인한다.
  - tsc 파일 이름 : Javascript로 파일을 변환시킨다.

- tsc 사용함에 있어서 npx를 붙이고 안붙이고의 차이?
  - npx tsc : npm i -D typescript
    - 현재 프로젝트에서만 사용 가능
  - tsc : npm i -g typescript
    - 전역으로 설치되었기 때문에 어디서든 사용 가능

# interface

- TypeScript에서의 interface는 Type을 미리 정의해두는 것이다.
- 일반적인 변수 등등에 사용 가능하며 class에 상속이 가능하다.
- 설계도
