const ulElem = document.getElementsByTagName("ul")[0];
axios.get("/board/list").then(({ data }) => {
  data.forEach((item) => {
    const tempLi = document.createElement("li");
    tempLi.innerText = item;
    ulElem.append(tempLi);
  });
});

document.forms.test1.onsubmit = function (e) {
  e.preventDefault();
  axios.post("/board/add", { value: e.target.test.value }).then(({ data }) => {
    console.log(data);
    ulElem.innerHTML = "";
    // data.forEach((item) => {
    //   const tempLi = document.createElement("li");
    //   tempLi.innerText = item;
    //   ulElem.append(tempLi);
    // });
  });
};
