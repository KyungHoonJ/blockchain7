document.getElementById("menu-btn").onclick = function (e) {
  document.getElementById("user-input-container").classList.toggle("on");
};

document.getElementById("board-add").onsubmit = async function (e) {
  e.preventDefault();
  if (!e.target["board-title"].value) {
    e.target["board-title"].focus();
    return;
  }
  if (!e.target["board-text"].value) {
    e.target["board-text"].focus();
    return;
  }
  //   console.log(e.target["board-title"].value);
  //   console.log(e.target["board-text"].value);
  try {
    const data = await axios.post("/api/board/add", {
      title: e.target["board-title"].value,
      text: e.target["board-text"].value,
      uptime: Date.now(),
    });
    // console.log(data.data);
    if (data.data.status == 200) {
      e.target["board-title"].value = e.target["board-text"].value = "";
    }
  } catch (err) {
    console.error(err);
  }
  getList();
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
const listElem = document.getElementById("list");

async function getList() {
  try {
    const data = await axios.get("/api/board?count=" + count);
    // count = 0 => /api/board?count=0
    // console.log(data.data.maxCount);

    pageElem.innerHTML = "";
    maxCount = data.data.maxCount;
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

    listElem.innerHTML = "";
    data.data.list.forEach((data, index) => {
      // tempData[count].forEach((data) => {
      const tempLi = document.createElement("li");
      const tempTitle = document.createElement("div");
      const tempH3 = document.createElement("h3");
      const tempImg = document.createElement("img");
      const tempText = document.createElement("div");
      const tempP = document.createElement("p");
      const tempTextarea = document.createElement("textarea");
      const tempBtnBox = document.createElement("div");
      const tempDelBtn = document.createElement("img");
      const tempEditBtn = document.createElement("img");
      const tempCancelBtn = document.createElement("img");

      tempTitle.classList.add("title");
      tempTitle.onclick = function (e) {
        tempText.classList.toggle("on");
        tempImg.classList.toggle("on");
        tempText.classList.remove("edit");
      };
      tempText.classList.add("text");
      tempImg.src = "./imgs/angle-up-solid.svg";
      tempImg.alt = "list-item-btn";
      tempH3.innerText = data.title;
      tempP.innerText = data.text;
      tempTextarea.value = data.text;

      tempBtnBox.classList.add("list-btn-box");
      tempDelBtn.src = "./imgs/trash-solid.svg";
      tempDelBtn.alt = "delete-btn";
      tempDelBtn.classList.add("delete");
      tempDelBtn.onclick = async function (e) {
        try {
          const data = await axios.post("/api/board/delete", {
            count,
            num: index,
          });
          getList();
          console.log(data.data);
        } catch (err) {
          console.log(err);
        }
      };
      tempEditBtn.src = "./imgs/face-grin-tongue-squint-solid.svg";
      tempEditBtn.alt = "edit-btn";
      tempEditBtn.onclick = async function (e) {
        if (tempText.classList.contains("edit")) {
          try {
            const data = await axios.post("/api/board/update", {
              count,
              num: index,
              text: tempTextarea.value,
              time: Date.now(),
            });
            getList();
            console.log(data.data);
          } catch (err) {
            console.log(err);
          }
        } else {
          tempTextarea.value = data.text;
          tempText.classList.add("edit");
        }
      };

      tempCancelBtn.src = "./imgs/xmark-solid.svg";
      tempCancelBtn.alt = "cancel-btn";
      tempCancelBtn.classList.add("cancel");
      tempCancelBtn.onclick = function (e) {
        tempText.classList.remove("edit");
      };

      tempBtnBox.append(tempEditBtn);
      tempBtnBox.append(tempDelBtn);
      tempBtnBox.append(tempCancelBtn);

      tempTitle.append(tempH3);
      tempTitle.append(tempImg);
      tempText.append(tempP);
      tempText.append(tempTextarea);
      tempText.append(tempBtnBox);
      tempLi.append(tempTitle);
      tempLi.append(tempText);
      listElem.append(tempLi);
    });
  } catch (err) {
    console.error(err);
  }
}
getList();

// axios.post("/api/board/add").then((data) => {
//   console.log(data);
// });
