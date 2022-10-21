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
  { title: "arvserv1", text: "9baresrsearvstb" },
  { title: "arvserv2", text: "8baresrsearvstb" },
  { title: "arvserv3", text: "7baresrsearvstb" },
  { title: "arvserv4", text: "6baresrsearvstb" },
  { title: "arvserv5", text: "5baresrsearvstb" },
  { title: "arvserv6", text: "4baresrsearvstb" },
  { title: "arvserv7", text: "3baresrsearvstb" },
  { title: "arvserv8", text: "2baresrsearvstb" },
  { title: "arvserv9", text: "1baresrsearvstb" },
];
