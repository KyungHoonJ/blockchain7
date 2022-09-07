let player = 0;
let num = 0; //현재까지 진행된 숫자
// let end = 0;
let start = 1;
let plus = 0;
const gameset = document.getElementById("gameset");

function game() {
  player = prompt("총 몇명이지? 애송이들 (2명~5명)");

  if (player >= 2 && player <= 5) {
    //플레이어수가 2보다 크거나 같고, 5보다 작거나 같을때만 실행.
    for (let i = 0; ; i++) {
      //플레이어수만큼 1p, 2p, 3p 구분짓기위해 사용 + 한사람당 숫자를 3개까지만 부를 수있음
      //         ㅣ-> i+1                         /     num + 3

      if (num + 3 < 30) {
        // 즉 현재까지 진행된 숫자가 27보다 작을때는 이번 차례에 끝낼 수 업다.
        count = prompt(`${i + 1}번째 플레이어가 숫자를 선택할 차례다.
  숫자는 ${num + 3}까지 부를 수 있다. 괜히 다른 숫자 넣으면 각오하거라.`);
      } else if (num >= 30) {
        //30보다 큰값을 입력하면 자동으로 다음사람이 걸리는데, 30을 입력하기전에
        //위 조건문에 먼저 걸려서 num+3이 이 조건에 걸리면서 i가 1더해지기에
        //i+2로 다음사람을 정하는게 아니라 i+1을 냅두는 것임.
        return alert(`${i + 1} 번째 플레이어 당첨. 소고기 잘 먹겠습니다. ㅎㅎ`);
      } else if (num < 30 && num + 4 >= 31) {
        //현재까지 진행된 숫자가 29이하이고, 27이상일때는 이번차례에 끝낼 수 있다.
        //이번차례에 3번 부른다고했을때 현재까지 진행된숫자 +3 이 31을 넘어버리면
        //prompt 출력에서 ${num+3} 이 33 , 32 이런식으로 넘어버릴 수 있음

        count = prompt(`${i + 1}번째 플레이어가 숫자를 선택할 차례다.
숫자는 30까지 부를 수 있다. 이거 잘만하면 너 다음 사람을 보낼 수 있겠는걸?`);
      }

      if (count <= num + 3 && count > num) {
        num = parseInt(count);
        alert(`마지막 숫자는 ${num}이다`);
      } else {
        return (gameset.style.display = "block");
        //조건을 만족하지 못하면 바로 펑
      }

      if (i + 1 >= player) i = -1;
    }
  } else {
    //플레이어수 조건에 걸리지않으면 계속 반복
    alert("2~5명만 시작할 수 있다.");
    game();
  }
}
