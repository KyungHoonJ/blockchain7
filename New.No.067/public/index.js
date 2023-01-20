document.getElementsByClassName("box")[0].onclick = function () {
  alert("클릭했다.");
};

const query = location.search.slice(1);
console.log(query);
document.getElementsByClassName("box")[0].innerHTML = decodeURI(
  query.split("=")[1]
);
