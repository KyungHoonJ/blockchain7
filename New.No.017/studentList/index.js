const headList = [
  { type: "number", name: "번호" },
  { type: "name", name: "이름" },
  { type: "age", name: "나이" },
  { type: "area", name: "거주지" },
  { type: "mbti", name: "MBTI" },
  { type: "bloodType", name: "혈액형" },
];
const studentsList = [];

function createStudent(name, age, area, mbti, bloodType) {
  studentsList.push({
    name,
    area,
    age,
    mbti,
    bloodType,
  });
}

createStudent("김성진", 27, "성남", "INTP", "B");
createStudent("염예나", 22, "하남", "ENFP", "B");
createStudent("정재훈", 30, "강남", "ENTP", "B");
createStudent("김재일", 29, "용인", "ENFP", "AB");
createStudent("이가원", 27, "광진", "ISFP", "O");

const tableHeaderElem = document.getElementById("table-header");
headList.forEach(({ name }) => {
  // headList의 아이템(객체)의 name을 구조분해할당으로 가져온다.
  tableHeaderElem.innerHTML += "<th>" + name + "</th>";
});

const studentListElem = document.getElementById("data-list");

studentsList.forEach((item, index) => {
  let tempStr = "<tr>";
  headList.forEach(({ type }) => {
    if (type === "number") tempStr += `<th>${index + 1}</th>`;
    else tempStr += `<td>${item[type]}</td>`;
  });
  tempStr += "</tr>";
  studentListElem.innerHTML += tempStr;
});
