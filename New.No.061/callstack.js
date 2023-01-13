// const a = 1;
// function func1() {
//   console.log("func1");
// }

// function func2() {
//   func1();
//   console.log("func2");
//   func4();
// }

// function func3() {
//   func2();
//   console.log("func3");
// }

// function func4() {
//   console.log("func4");
// }

// func3();

// const x = "x";
// function c() {
//   console.log("c", x);
// }

// function a() {
//   const x = "xx";
//   console.log("a", x);
//   function b() {
//     console.log("b", x);
//     c();
//   }
//   b();
// }

// a();

// function recursive(a) {
//   console.log(a);
//   recursive(a + 1);
//   // 재귀함수, 함수 스스로가 스스로를 호출한다.
//   // 자기 자신을 호출하는 함수
//   // 팩토리얼 : n!
//   // 1 * 2 * 3 * 4 * 5
// }

// recursive(1);

function add(a, b) {
  console.log("add : ", a + b);
}
console.log("console.log : ", add(1, 2));

function add1(a, b) {
  return a + b;
}

// add1(a, b) => a + b
console.log("add1 : ", add1(1, 2));
