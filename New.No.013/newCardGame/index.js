let cards = [
  "Angelus",
  "Blue Mushroom",
  "Crying Blue Mushroom",
  "Cynical Orange Mushroom",
  "Denebola",
  "Diamond Guardian",
  "Enraged Fire Spirit",
  "Falling Imago",
  "Hyades",
  "Lilli Borea",
  "Magma Slime",
  "Oceanleli",
  "Olivine Guardian",
  "Orange Mushroom",
  "Peaceful Imago",
  "Senyabot Alpha",
  "Sinking Imago",
  "Stone Kiwi",
  "Veritate",
  "Volar",
  "Angelus",
  "Blue Mushroom",
  "Crying Blue Mushroom",
  "Cynical Orange Mushroom",
  "Denebola",
  "Diamond Guardian",
  "Enraged Fire Spirit",
  "Falling Imago",
  "Hyades",
  "Lilli Borea",
  "Magma Slime",
  "Oceanleli",
  "Olivine Guardian",
  "Orange Mushroom",
  "Peaceful Imago",
  "Senyabot Alpha",
  "Sinking Imago",
  "Stone Kiwi",
  "Veritate",
  "Volar",
];
const endCards = [];

function shuffle(arr) {
  if (!arr?.length || typeof arr != "object") {
    alert("배!열!만!");
    return "이상한 거 넣지 말고 배열만 넣으라고!";
  }
  for (let i = 0; i < 100; i++) {
    const first = parseInt(Math.random() * arr.length);
    const second = parseInt(Math.random() * arr.length);
    const temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }
  return arr;
}

cards = shuffle(cards);

const cardElems = [];
let tempCard = 0;
let tempNum = 0;
let isClick = false;
const fullTime = 150;
let time = fullTime;
let isOver = false;
let isStart = false;
let timeout;

function reverseCard(number) {
  [...document.getElementById("card" + number).children].forEach((elem) => {
    if (elem.classList.contains("off"))
      setTimeout(() => {
        elem.classList.toggle("off");
      }, 300);
    else elem.classList.toggle("off");
  });
}

function selectCard(number) {
  if (
    isClick ||
    endCards.includes(number) ||
    tempNum == number ||
    isOver ||
    !isStart
  )
    return;
  isClick = true;
  reverseCard(number);

  if (tempNum) {
    if (tempCard == cards[number - 1]) {
      setTimeout(() => {
        isClick = false;
        endCards.push(number, tempNum);
        tempNum = 0;
        if (endCards.length === cards.length) {
          isOver = true;
          isStart = false;
          clearInterval(timeout);
          document.getElementById(
            "remain-time"
          ).innerHTML = `Congratulation! Play Time : ${parseInt(
            (fullTime - time) / 60
          )}:${((fullTime - time) % 60).toString().padStart(2, "0")}`;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        reverseCard(number);
        reverseCard(tempNum);
        tempNum = 0;
        isClick = false;
      }, 1000);
    }
  } else {
    tempCard = cards[number - 1];
    tempNum = number;
    setTimeout(() => {
      isClick = false;
    }, 300);
  }
}

function start() {
  const timeoutElem = document.getElementById("remain-time");
  if (isStart) {
    isOver = false;
    isStart = false;
    timeoutElem.innerHTML = `Game Over / Count : ${
      endCards.length / 2
    } / ReStart`;
    clearInterval(timeout);
  } else {
    isOver = false;
    isStart = true;
    time = fullTime;
    timeoutElem.innerHTML = `${parseInt(time / 60)} : ${(time % 60)
      .toString()
      .padStart(2, "0")}`;

    for (let i = 0; i < cards.length; ++i) {
      reverseCard(i + 1);
      setTimeout(() => {
        reverseCard(i + 1);
      }, 1000);
    }
    timeout = setInterval(() => {
      time--;
      timeoutElem.innerHTML = `${parseInt(time / 60)} : ${(time % 60)
        .toString()
        .padStart(2, "0")}`;
      if (time == 0) {
        timeoutElem.innerHTML = `Game Over / Count : ${
          endCards.length / 2
        }  / ReStart`;
        isOver = true;
        isStart = false;
        clearInterval(timeout);
      }
    }, 1000);
  }
}
