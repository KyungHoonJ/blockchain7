const students = [
  "",
  "",
  "",
  "이가원",
  "박혜림",
  "",
  "김영준",
  "이재혁",
  "장정현",
  "김선주",
  "박예성",
  "",
  "허재원",
  "염예나",
  "김정규",
  "신상목",
  "김재일",
  "고우석",
  "최원겸",
  "김성진",
  "",
  "",
  "",
  "",
  "",
  "정재훈",
];

const swapNum = { first: -1, second: -1 };

const studentElems = [...document.getElementsByClassName("place")];
console.log(studentElems);
function onClick(num) {
  console.log(num);
  if (swapNum.first < 0) {
    swapNum.first = num;
  } else if (swapNum.second < 0) {
    swapNum.second = num;
    const temp = students[swapNum.first];
    students[swapNum.first] = studentElems[swapNum.first].innerHTML =
      students[swapNum.second];
    console.log(students[swapNum.second]);

    students[swapNum.second] = studentElems[swapNum.second].innerHTML = temp;
    swapNum.first = swapNum.second = -1;
  }
}

studentElems.forEach((elem, index) => {
  elem.style.gridArea = "place" + (index + 1);
  elem.onclick = () => onClick(index);
  elem.innerHTML = students[index];
});

document.getElementsByClassName("professor")[0].onclick = () => {
  document
    .getElementsByClassName("grid-container")[0]
    .classList.toggle("rotate");
  studentElems.forEach((elem) => {
    elem.classList.toggle("rotate");
  });
  console.log(students);
};
