const ulElem = document.getElementsByTagName("ul")[0];

document.forms.test1.onsubmit = function (e) {
  e.preventDefault();
  axios.post("/board/add", { value: e.target.test.value }).then(({}) => {
    location.reload();
  });
};
