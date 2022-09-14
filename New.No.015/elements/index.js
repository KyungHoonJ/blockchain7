console.log(document.body.children);
// children은 엘리먼트의 자식 엘리먼트들을 가져온다, 호출한다.

console.log(document.body.childNodes);
// childNodes는 자식 노드들을 모두 가져온다.

console.log(document.getElementById("parent").childNodes);

console.log(document.getElementById("parent").parentElement);
// 부모 엘리먼트를 가져온다.

console.log(document.getElementById("child1").parentElement);

console.log(document.getElementById("parent").firstElementChild);
// 첫번째 자식 엘리먼트를 가져온다.

console.log(document.getElementById("parent").lastElementChild);
// 마지막 자식 엘리먼트를 가져온다.

console.log(document.getElementById("child1").nextElementSibling);
// 다음 형제 엘리먼트를 가져온다.

console.log(document.getElementById("child1").previousElementSibling);
// 이전 형제 엘리먼트를 가져온다.

let children = [...document.getElementById("parent").children]; // << 얘는 배열이 아니라 컬렉션이라 합니다. forEach를 쓰고싶으면 배열로 변환해야한다.
// 변환 방법 => [...변환할 변수]
console.log(children);
children.forEach((elem) => {
  console.log(elem);
});

console.log(document.getElementsByClassName("child"));
// 클래스명을 찾아서 Element들을 가져온다.

children = document.getElementsByClassName("child");

console.log(children);
console.log(children[0]);

children[0].onclick = () => {
  alert("온클릭");
};

function onClick(num) {
  console.log(num + "번째 자식을 클릭했어!");
}

[...children].forEach(function (elem, index) {
  // forEach 매개변수함수에 매개변수로 (item, index) 형식으로 받을 수 있으며
  // item은 배열의 아이템 하나하나, index는 해당 아이템의 인덱스번호(몇번째 아이템인가?)
  // forEach는 배열의 아이템을 하나하나 가져와서 매개변수함수로 전달된 함수에 매개변수로 전달해서 함수를 호출한다.
  elem.onmouseover = () => {
    elem.classList.toggle("hover");
  };
  elem.onmouseleave = () => {
    elem.classList.toggle("hover");
  };
  elem.onclick = function () {
    onClick(index);
    console.log(elem.innerHTML);
    /*{
      if (elem.classList.contains("on")) {
        // contains 메서드는 매개변수로 전달된 문자열(string)이 클레스에 포함되어 있는지를 확인한다.
        elem.classList.remove("on");
        // remove 메서드는 클래스를 삭제한다.
      } else elem.classList.add("on");
      // classList는 엘리먼트의 클래스를 관리하는 객체이다.
      // add 메서드는 클래스를 추가한다.
    }*/
    elem.classList.toggle("on");
    // toggle 메서드는 클래스가 있으면 없애고 없으면 추가한다.
  };
});

const tempArr = ["a", "b", "c"];

// for each
tempArr.forEach((item, index) => {
  console.log(item + " : " + index + "번째 아이템");
  // forEach의 유일한? 단점 : 멈출 수 없다.
});
// forEach 결과
// a : 0번째 아이템
// b : 1번째 아이템
// c : 2번째 아이템

for (let index = 0; index < tempArr.length; ++index) {
  const item = tempArr[index];
  // forEach에서 사용하는 item이랑 변수 통일하기 위해서 초기화
  console.log(item + " : " + index + "번째 아이템");
}

console.log(document.getElementById("parent").innerHTML);
// HTML 기준으로 텍스트를 가져온다.
console.log(document.getElementById("parent").innerText);
// HTML 태그 등등을 제외한 텍스트만 가져온다.

document.getElementById("btn").onclick = () => {
  // 버튼 클릭 시 실행
  console.log(document.getElementById("BTS").value);
  // BTS에 입력된 값을 로그로 출력한다.
  document.getElementById("btn").style.backgroundColor = "#ff0000";
};
