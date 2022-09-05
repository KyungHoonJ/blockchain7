let num = 0;

function change() {
  document.getElementById("change").innerHTML = `<img src="${
    ++num % 3
  }.png" alt="change" />`;
  // document, getElementById,innerHTML 등은 이후에 자세히 한다.
  // innerHTML은 여는 태그와 닫는 태그 사이의 텍스트다.
}
