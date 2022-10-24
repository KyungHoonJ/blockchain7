// javascript는 prototype이다.
// 변수는 저장할 데이터의 이름이다.
//   const, let, var
//   var는 hoisting(호이스팅)이 가능하다.
//   저장한 데이터의 이름이기 때문에 호출하면 저장된 데이터를 가져온다, 출력한다, 사용한다
//   const는 변경 불가능하다. << 재정의가 불가능하다.
//   let은 같은 이름을 사용하지 못한다. << 재선언이 불가능하다.
//   let은 다른 데이터를 다시 저장할 수 있다. << 변경이 가능하다. << 재정의가 가능하다.
//   var는 마음대로 마구잡이로 사용 가능하다. << 같은 이름을 사용할 수 있다. << 재선언이 가능하다. 단, 덮어쓴다.

// console.log(constA); // << hoisting 불가능
// console.log(letA); // << hoisting 불가능
console.log(varA); // << hoisting 가능

const constA = 1;
// constA = 2; // << 재정의가 불가능하다.
// const constA = 3; // << 재선언이 불가능하다.
let letA = 1;
letA = 2;
// let letA = 3; // << 재선언이 불가능하다.
var varA = 1;
varA = 2;
var varA = 3;

// 자료형
// string, number, boolean, Array, null, Function, Object, undefined, Symbol
// string : 문자열
// number : 숫자
// boolean : 참거짓
// Array : 배열
// null : 비어있는 값 / 비어있다고 정의한 값
// Function : 함수
// Object : 객체
// undefined : 선언은 했는데 입력하지 않은 값 / 그냥 빈값(정의하지 않았다.)
// Symbol : 절대적으로 같지 않는 값 << 'asdf'를 2개를 선언했다. 두 값은 같은 값일까?

console.log('"asdf" == "asdf" : ', "asdf" == "asdf");
console.log(
  'Symbol("asdf") == Symbol("asdf") : ',
  Symbol("asdf") == Symbol("asdf")
); // 다르다고 나온다.

const constB = 1;
console.log("constA == constB : ", constA == constB);

("constTest"); // << 뭘까? string / const
1; // << number / const
console.log(typeof constA);
console.log(typeof constA.toString());
console.log(typeof 1);
console.log(typeof (1).toString());
console.log("asdf".toUpperCase());

console.log(typeof "123");
console.log(typeof +"123");
console.log(typeof parseInt("123"));
console.log(typeof Math.floor("123"));
console.log(typeof parseFloat("123"));
console.log(typeof Number("123"));

console.log((132).toString());
console.log(Boolean(123));
console.log(!!123);

console.log([1].push(10)); // << 왜 1이 나올까? push는 제일 뒤에 아이템을 추가한다. push는 length를 반환한다.
console.log([1, 2, 3, 5, 4].pop()); // 왜 4가 나올까? pop은 맨 뒤의 아이템을 제거한다. 뭘 제거했는지 보여주기 위해 제거한 아이템을 반환한다.
console.log([1].unshift(4)); // 제일 앞에 아이템을 추가한다.
console.log([10, 1].shift()); // 제일 앞에서 아이템을 제거한다. pop과 마찬가지로 제거한 아이템을 반환한다.

// [].join() << 아이템을 string으로 연결, 매개변수로 받은 string을 아이템 중간에 삽입
// [].filter() << 거름막 << 내가 원하는 데이터만 배열로 반환한다.
// [].find() << 찾다 << 깊이 찾다. 객체 내의 데이터들을 확인하여 찾을 때 사용한다. 찾은 아이템을 반환한다.
// [].findIndex() << 찾다 << 깊이 찾다. 객체 내의 데이터들을 확인하여 찾을 때 사용한다. 찾은 아이템의 index를 반환한다.
// [].indexOf() << 찾다 << 얕게 찾다. 데이터 자체를 찾아 그 아이템의 index를 반환한다. 객체일 경우에 그 객체 자체로 찾아야한다.
// [].forEach() << for문
// [].map() << 배열의 아이템을 변화시키고 싶을 때 사용한다. 각 아이템에 대해서 매개변수 함수를 실행하고 그 반환 값을 배열에 넣어서 반환한다.
// [].slice() << 자르기
// [].splice() << 자르기(원본 훼손)
// [].reduce() << 합하기(join 메서드는 단순하게 string이지만 reduce는 내맘대로 할 수 있다.(모든 학생의 과학 점수를 합할 수 있다. << 모든 학생이라는 말은 학생들의 배열 / 과학 점수라는 말은 각 학생이 여러 점수를 갖고있는데 그중에 과학 점수만을 뜻함(점수가 객체로 저장되어 있다.) / 합할 수 있다라는 말은 객체 내의 프로퍼티(키)를 사용하여 각 값을 더할 수 있다. ))
// [].reverse() << 순서 뒤집기
// [].sort() << 정렬
// [].concat() => [...A, ...B] << 배열 합치기

// Object
// 객체 : 키와 값으로 이루어져있다. key: value
// 선언은 {}로 묶어서 선언한다.
const tempObj = { a: 1, b: 2 };
let a = 1;
let b = 2;
tempObj.a; // 1
tempObj.b; // 2
// 사용함에 있어서 다른 점 : 객체의 프로퍼티(키값)이니까 tempObj를 붙여서 .을 통해서 찾아서 사용한다.
// let a는 재정의 가능? O / tempObj.a는 재정의 가능? O
a = 3;
tempObj.a = 3;
// 프로퍼티(키값)는 간단하게 생각해서 {} 안에 있는 변수이다.
// 객체 안에 프로퍼티로 객체가 가능? O
const tempObj1 = { data: { data: { list: 1 } } };
tempObj1.data.data.list;
tempObj1["data"]["data"]["list"];
const tempKey = "data";
console.log(tempObj1[tempKey][tempKey]); // 예나는 list: 1, 재혁이는 1, 원겸이는 1, 1, 선주, 상목는 { list: 1 }
console.log(tempObj1[tempKey][tempKey][tempKey]); // 예나, 재혁이, 선주, 상목는 1, 원겸이는 undefined << tempObj1.data.data.data
// 어디서 봤을까? << node.js에서 express 서버를 생성하고 axios로 데이터를 응답 받았을 때 사용했다. ex)data.data.list

// JSON은 객체 데이터를 파일로 저장하기 위해서 사용한다.

// Array[Object]
const tempArr = [{ a: 1 }, { a: 2 }, tempObj, { a: 3 }, { a: 4 }];
console.log(tempArr.findIndex((item) => item.a === 1)); // 재혁 : 1 / 예나 : true / 원겸 : 0 / 상목 : 0 / 선주 : 0 << 0
console.log(tempArr.indexOf({ a: 1 })); // 재혁 : number / 예나 : 0 / 원겸 : 0 / 상목 : 0 / 선주 : 0 << -1
console.log(tempArr.indexOf(tempObj)); // 재혁 : -1 / 예나 : 2 / 원겸 : 1 / 상목 : 2 / 선주 : 1 << 2
console.log({ a: "asdf" } == { a: "asdf" }); // 재혁 : true / 예나 : true / 원겸 : false / 상목 : false / 선주 : false << false

const tempObj2 = tempObj;
console.log(tempObj2 === tempObj); // 재혁 : true / 예나 : false / 원겸 : true / 상목 : true / 선주 : true << true
const tempObj3 = { ...tempObj, be: 1, a: 6 };
// { ...tempObj, be: 1, a: 6 } => { a: 1, b: 2, be: 1, a: 6 } => { a: 6, b: 2, be: 1 }
console.log(tempObj3); // a: ? => 재혁 : a: 6 / 예나 : a: 1 / 원겸 : a: 1, a: 6 / 상목 : a: 1, a: 6 / 선주 : a: 6 / 재훈 : a: 6 << a: 6
console.log(tempObj);
console.log(tempObj3 === tempObj); // 재혁 : true / 예나 : false / 원겸 : false / 상목 : true / 선주 : false << false

console.log([1, 2, 4, 3]);
console.log(...[1, 2, 4, 3]); // 재혁 : 안됨 / 예나 : 됨 / 원겸 : 안됨 / 상목 : 됨 / 선주 : 됨
console.log(1, 2, 4, 3);

[1, 2, 3, 4].reduce((prev, curr) => prev + curr, 0);
[1, 2, 3, 4].reduce((prev, curr) => {
  return prev + curr;
}, 0);

[1, 2, 3, 4].reduce(function (prev, curr) {
  return prev + curr;
}, 0);

// prev = 0, curr = 1, result = 1 => prev = 1, curr = 2, result = 3 => prev = 3, curr = 3, result = 6 => prev = 6, curr = 4, result = 10

console.log(
  [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }].reduce((prev, curr) => {
    const temptemp = prev.length ? prev[prev.length - 1] : { a: 0 };
    prev.push({ a: temptemp.a + curr.a });
    return prev;
  }, [])
);

// Function
// 함수 : 기능(코드)을 실행
funcA(1); // 재혁 : 에러 출력 / 예나 : 호이스팅 안되서 에러 출력 / 원겸 : 1 출력 / 상목 : 1 출력 / 선주 : 1 출력 << 함수 선언문은 호이스팅이 가능하기 때문에 함수 호출을 정상적으로 진행한다 => 1 출력
function funcA(b) {
  console.log(b);
}

// funcB("asdf"); // 재혁 : 에러 출력 / 예나 : "asdf" 출력 / 원겸 : "asdf" 출력 / 상목 : 에러 출력 / 선주 : "asdf" 출력 << 호이스팅이 안되기 때문에 에러 발생

// let funcB = function (a) {
//   console.log(a);
// }; // 표현식은 호이스팅이 안된다.

// funcC("asdf"); // 재혁 : "asdf" 출력 / 예나 : 에러 출력 / 원겸 : "asdf" 출력 / 상목 : 에러 출력 / 선주 : 에러 출력

// var funcC = function (a) {
//   console.log(a);
// };

let funcD = (a) => {
  console.log(a);
}; // 화살표 함수

let funcE = (a) => console.log(a);
// funcE("sadfasdf");

// let funcF = (a, b) => a + b;
// let funcG = (a, b) => {
//   a + b;
// };

// console.log(funcF(1, 2)); // 재혁 : 3 / 예나 : 3 / 원겸 : 3 / 상목 : 3 / 선주 : 3
// console.log(funcG(1, 2)); // 재혁 : 3 / 예나 : undefined / 원겸 : 3 / 상목 : 3 / 선주 : 3

[1, 2, 3, 4].reduce((prev, curr) => prev + curr, 0);

let funcF = (a, b) => a + b;

console.log([1, 2, 3, 4].reduce(funcF, 0)); // 재혁 : 10 / 예나 : 에러 출력 / 원겸 : 에러 출력 / 상목 : 되긴한다 / 선주 : 에러 출력 << 10

// [].forEach()
console.log([1, 2, 3, 4].forEach((item) => item)); // << undefined
// [].map()
console.log(
  "map : ",
  [1, 2, 3, 4].map((item) => !!(item % 2))
); // 재혁 : [2, 4] / 예나 : [false, true, false, true] / 원겸 : [true, false, true, false] / 상목 : GG / 선주 : GG

console.log([1, 2, 3, 4].filter((item) => item % 2));
