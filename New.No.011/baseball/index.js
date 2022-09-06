const comSel = [];

// Math.random 메서드는 0 <= number && number < 1
function comSelectFunc() {
  for (
    let tempNum = parseInt(Math.random() * 10);
    comSel.length < 3;
    tempNum = parseInt(Math.random() * 10)
  ) {
    console.log(tempNum);
    if (!comSel.includes(tempNum)) comSel.push(tempNum);
    // includes 메서드는 매개변수가 배열에 포함되어 있는지 Boolean 값을 반환(리턴)해준다.
  }
  // for(변수 초기화; 조건; 반복 후 변경점){내용}
  // 1. for는 "변수 초기화"를 실행하고, 조건을 확인 후 내용을 실행한다.
  // 2. 내용 실행이 끝나면 "반복 후 변경점" 코드를 실행한다.
  // 3. "반복 후 변경점" 코드 실행 후 조건을 확인하여 true면 내용을 실행한다.
  // 이후 2로 돌아가서 다시 진행한다.
}

function comSelectFunc1() {
  for (; comSel.length < 3; ) {
    // for의 변수 초기화와 반복 후 변경점을 삭제했다.
    const tempNum = parseInt(Math.random() * 10);
    // for 반복 내용에 tempNum를 초기화하여 comSel 배열을 확인 후 배열에 추가하도록 수정했다.
    // 위(comSelectFunc)에서 for 변수 초기화는 let인데 여기서는 왜 const인가?
    // comSelectFunc에서는 변수 초기화 후에 해당 변수를 계속 재정의하여 확인해야하지만 여기서(comSelectFunc1)는 반복 내용에서 변수를 초기화 하기 때문에 재정의가 필요치 않아 const가 가능하다.
    console.log(tempNum);
    if (!comSel.includes(tempNum)) comSel.push(tempNum);
  }
}

function comSelectFunc2() {
  while (comSel.length < 3) {
    // comSelectFunc1의 for문은 조건만 남아있기 때문에 while로 대체 가능하다.
    const tempNum = parseInt(Math.random() * 10);
    console.log(tempNum);
    if (!comSel.includes(tempNum)) comSel.push(tempNum);
  }
}

// comSelectFunc();
// comSelectFunc1();
comSelectFunc2();
// 함수를 호출함으로써 컴퓨터의 숫자를 3개 정한다. 3개의 함수중 뭘 선택해도 상관 없음(단 여려개 호출 시 아래에서 호출된 것은 무시됨)
// 무시되는 이유는 조건이 같기 때문에 위 조건에 충족하지 않을 시 아래의 조건 또한 충족되지 않아 실행되지 않는다.

console.log(comSel);
let count = 0;

while (true) {
  let playerSel = [];
  while (playerSel.length < 3) {
    const tempInput = prompt(
      "3자리의 숫자를 입력하시오.\n0으로 시작 가능 / 중복 숫자 불가"
    );
    // 입력 창에 대해서 취소를 누르면 tempInput은 정의되지 않아 undefined를 갖게된다.
    // 그래서 length를 갖지 못해 if에서 문제가 생기게 된다.
    if (!tempInput) {
      // tempInput이 undefined, '' 일 때 false를 갖게되며 !를 사용해 부정함으로써 빈값을 입력하거나 취소를 누를 시 게임을 종료한다.
      alert("게임을 종료합니다.");
      break;
    }
    if (tempInput.length != 3 || isNaN(parseInt(tempInput))) {
      // isNaN 함수는 매개변수가 NaN, 즉 숫자가 아닌 문자를 강제로 숫자로 바꿨는지 확인해준다.
      continue;
      // 아래의 코드를 실행하지 않고 반복을 다시 시작한다.
    }

    //  사용자 입력에 대해서 중복 체크
    tempInput.split("").forEach((item) => {
      // forEach는 배열의 아이템을 하나하나 가져와서 매개변수함수에 전달하여 함수를 실행한다.
      // (item) => {내용} << 화살표 함수이다.
      // item은 tempInput.split('') 배열의 하나하나의 아이템이다.
      // function(item){내용} 으로 대체 가능(75~77번 줄)
      if (!playerSel.includes(parseInt(item))) playerSel.push(parseInt(item));
      // 컴퓨터가 선택한 랜덤 수는 정수기 때문에(8, 24, 36번 줄 참고) 플레이어가 입력한 숫자 또한 정수로 정의한다.
      // 컴퓨터가 선택한 랜덤 수와 마찬가지로 중복되면 안되기 때문에 playerSel 배열에 숫자가 없는지 확인 후 추가한다.
    });
    //   tempInput.split("").forEach(function(item) {
    //     if (!playerSel.includes(parseInt(item))) playerSel.push(parseInt(item));
    //   });
    console.log(playerSel);

    // //  위의 forEach는 아래의 코드로 대체할 수 있다.
    //   const tempArr = tempInput.split("");
    //   // tempArr이라는 변수로 배열을 정의한다. << 왜? 그때그때마다 문자열(tempInput)을 split 메서드를 사용하여 짜르면 시간이 그만큼 늘어난다.
    //   for (let i = 0; i < tempArr.length; i++) {
    //     // 컴퓨터는 숫자를 0부터 세기 때문에 i(index)를 0부터 시작하여 tempArr 배열의 끝(길이 - 1)까지 코드를 실행한다.
    //     if (!playerSel.includes(parseInt(tempArr[i])))
    //       playerSel.push(parseInt(tempArr[i]));
    //   }
    //   console.log(playerSel);

    if (playerSel.length != 3) playerSel = [];
  }

  if (!playerSel.length) break;
  //   입력값이 없을 경우 playerSel은 빈 배열([])이 됨으로 배열의 길이를 확인하여 break로 while을 종료해준다.

  console.log("입력된 정상적인 플레이어의 선택 : " + playerSel);

  let strike = 0;
  let ball = 0;
  let out = 0;
  // 첫번째 자리를 확인한다.
  let tempNumber = comSel[0];
  if (playerSel[0] == tempNumber) {
    strike++;
  } else if (playerSel[1] == tempNumber || playerSel[2] == tempNumber) {
    ball++;
  } else {
    out++;
  }

  // 두번째 자리를 확인한다.
  tempNumber = comSel[1];
  if (playerSel[1] == tempNumber) {
    strike++;
  } else if (playerSel[0] == tempNumber || playerSel[2] == tempNumber) {
    ball++;
  } else {
    out++;
  }

  // 세번째 자리를 확인한다.
  tempNumber = comSel[2];
  if (playerSel[2] == tempNumber) {
    strike++;
  } else if (playerSel[0] == tempNumber || playerSel[1] == tempNumber) {
    ball++;
  } else {
    out++;
  }

  if (strike == 3) {
    // strike가 3이면 게임을 종료한다.
    alert(++count + "번 만에 성공하셨네요.");
    break;
  }
  // strike가 3일 경우에 위에서 break로 while문이 종료되어 아래 코드는 실행되지 않는다.
  // 아래 코드는 count를 증가시키고 count, strike, ball, out을 표기해준다.
  alert(
    ++count +
      "번 시도함 / strike : " +
      strike +
      " / ball : " +
      ball +
      " / out : " +
      out
  );
}

// while(true){ // <왜 true로 넣으셨나요?
//     // strike의 넣고싶으면 while문 밖에서 선언해야된다.
//     break;
//     // 왜 break로 멈추나요? true일때만 break로 멈출 수 있나요?
//     // break와 true는 아무 관계 없습니다.
// }
