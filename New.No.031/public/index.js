const todoList = document.getElementById("list");
function getList() {
  todoList.innerHTML = "";
  axios.get("http://localhost:8080/api/list").then((resData) => {
    resData.data.list.forEach((todo) => {
      const tempElem = document.createElement("li");
      tempElem.classList.add("list-group-item");
      tempElem.innerHTML = `${todo.text} / 등록 시간 : ${new Date(todo.time)}`;
      todoList.append(tempElem);
    });
  });
}
getList();

document.forms["todo-form"].onsubmit = function (e) {
  e.preventDefault(); // << 기본 이벤트를 막는다.

  // XMLHttpRequest => fetch/ajax => axios
  // http 모듈 => express

  axios
    .post("http://localhost:8080/api/list", {
      name: document.forms["todo-form"]["do-name"].value,
      time: Date.now(),
      // test: 1,
      // str: "김재일",
    })
    .then((data) => {
      getList();
    });
  //   const getUrl =
  //     "/api/add?name=" +
  //     document.forms["todo-form"]["do-name"].value +
  //     "&str=이가원";
  //   axios.get(getUrl);
  //   axios.post('라우터', 서버의 req.body)
  // 저 데이터를 보낸다.

  /*
  axios
    .delete("/api/list", {
      // 삭제
    })
    .then((data) => {});
  axios
    .put("/api/list", {
      // 수정
    })
    .then((data) => {});

  위 2 코드를 적절하게 사용하시오
  */
};
