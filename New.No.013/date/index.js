const today = new Date();

console.log(today);

console.log(today.toLocaleString());
console.log(today.toUTCString());

console.log(today.getDate());
console.log(today.getDay()); // 요일을 0~6(일~토)로 출력합니다.

console.log(today.getMonth());
// 날짜 관련이다 => Date
console.log(Date.now());
console.log(new Date(Date.now()));
