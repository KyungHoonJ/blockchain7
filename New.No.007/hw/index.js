// 원래 내주려고 했던 과제
// 컴퓨터가 1 ~ 100사이의 하나의 숫자를 골라
// 사람이 하나의 숫자를 선택해
// 숫자를 맞추면 끝
// 못맞추면 대소 비교해서 UP(내가 선택한 숫자가 크다)
// Down(내가 선택한 숫자가 작다.)
// 총 몇번 입력했는지.
// 맞췄을때 '축하합니다, 몇번 입력하셨습니다'
console.log(Math.random()); // 0~1까지의 랜덤수
// parseInt(***) << 정수화 함수야

const comSel = parseInt(Math.random() * 99 + 1);
// 컴퓨터 선택 완료
console.log(comSel);
let playerSel;
let count = 0;
let max = 100;
let min = 0;
let updown = "";
const maxCount = parseInt(prompt("몇번만에 맞출래? 숫자로만"));

do {
  playerSel = prompt(`${updown}\n숫자를 선택해 주세요.
    컴퓨터가 선택한 숫자를 맞추시면 됩니다.\n최소 : ${min} / 최대 : ${max} / 남은 횟수 : ${
    maxCount - count
  }`); // prompt는 string, parseInt 정수형으로 바꿔줌으로 number
  // 카운트를 플레이어가 입력했을 때 하나씩 증가시킨다. << 여기서는 삭제한다.
  playerSel = parseInt(playerSel);
  if (min >= playerSel || max <= playerSel) {
    // 최소와 최대 사이에 값만 확인하기 위해 최소 미만과 최대 초과를 먼저 처리한다.
    console.log("제외된 숫자들이다.");
  } else if (playerSel === comSel) {
    count = count + 1;
    console.log(`${count}번 만에 맞추셨네요, 축하합니다.`);
    break;
  } else if (playerSel > comSel) {
    // 플레이어가 선택한 숫자가 컴퓨터가 선택한 숫자보다 크다.
    max = playerSel;
    // max가 현재 플레이어가 선택한 숫자가 된다.
    console.log("UP!");
    updown = "UP";
    count++;
    // 정상적인 숫자를 입력했을때만 카운트를 늘리도록 UP, DOWN일때 카운트를 추가한다.
  } else if (playerSel < comSel) {
    min = playerSel;
    console.log("DOWN!");
    updown = "DOWN";
    count++;
    // 정상적인 숫자를 입력했을때만 카운트를 늘리도록 UP, DOWN일때 카운트를 추가한다.
  } else {
    console.log("숫자만! 입력해라!");
    updown = "숫자만! 입력해라!";
  }
} while (playerSel !== comSel && count < maxCount);
if (count >= maxCount) {
  console.log("제한 횟수를 초과했네요 ㅋㅋ");
}
// 컴퓨터가 숫자 선택 후 플레이어가 선택하는 것은 계속 반복되야한다.
// 언제까지? 플레이어가 컴퓨터의 숫자를 맞출때까지.
