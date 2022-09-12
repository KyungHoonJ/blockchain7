cardElems.push(...document.getElementsByClassName("img-cover"));
cardElems.forEach((elem, index) => {
  elem.innerHTML = `<img src="./imgs/${cards[index]}.gif" alt="${cards[index]}" />`;
});
