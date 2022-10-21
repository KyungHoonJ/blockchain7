document.getElementById("menu-btn").onclick = function (e) {
  document.getElementById("user-input-container").classList.toggle("on");
};

document.getElementById("board-add").onsubmit = function (e) {
  e.preventDefault();
  if (!e.target["board-title"].value) {
    e.target["board-title"].focus();
    return;
  }
  if (!e.target["board-text"].value) {
    e.target["board-text"].focus();
    return;
  }
  console.log(e.target["board-title"].value);
  console.log(e.target["board-text"].value);
};
// form 안에 있는 button은 기본적으로 form의 submit을 실행

const tempData = [
  [
    { title: "arvserv1", text: "9baresrsearvstb" },
    { title: "arvserv2", text: "8baresrsearvstb" },
    { title: "arvserv3", text: "7baresrsearvstb" },
    { title: "arvserv4", text: "6baresrsearvstb" },
    { title: "arvserv5", text: "5baresrsearvstb" },
  ],
  [
    { title: "arvserv6", text: "4baresrsearvstb" },
    { title: "arvserv7", text: "3baresrsearvstb" },
    { title: "arvserv8", text: "2baresrsearvstb" },
    { title: "arvserv9", text: "1baresrsearvstb" },
  ],
];

let maxCount = 2; // 총 페이지 수
let count = 0; // 현재 페이지

const pageElem = document.getElementById("page");

for (let i = 0; i < maxCount; ++i) {
  const tempLi = document.createElement("li");
  tempLi.innerText = i + 1;
  tempLi.onclick = function (e) {
    count = i;
    pageElem.getElementsByClassName("now")[0].classList.remove("now");
    tempLi.classList.add("now");
    getList();
  };
  if (count === i) {
    tempLi.classList.add("now");
  }
  pageElem.append(tempLi);
}

const listElem = document.getElementById("list");

function getList() {
  listElem.innerHTML = "";
  tempData[count].forEach((data) => {
    const tempLi = document.createElement("li");
    const tempTitle = document.createElement("div");
    const tempH3 = document.createElement("h3");
    const tempImg = document.createElement("img");
    const tempText = document.createElement("div");
    const tempP = document.createElement("p");

    tempTitle.classList.add("title");
    tempTitle.onclick = function (e) {
      tempText.classList.toggle("on");
      tempImg.classList.toggle("on");
    };
    tempText.classList.add("text");
    tempImg.src = "./imgs/angle-up-solid.svg";
    tempImg.alt = "list-item-btn";
    tempH3.innerText = data.title;
    tempP.innerText = data.text;

    tempTitle.append(tempH3);
    tempTitle.append(tempImg);
    tempText.append(tempP);
    tempLi.append(tempTitle);
    tempLi.append(tempText);
    listElem.append(tempLi);
  });
}
getList();

axios.post("/api/board/add").then((data) => {
  console.log(data);
});
