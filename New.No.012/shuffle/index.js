const cards = [];

for (let i = 0; i < 8; i++) {
  cards.push(i + 1);
  cards.push(i + 1);
}
// 카드 1~8까지 쌍으로 8페어 16장
console.log(cards);

for (let i = 0; i < 100; i++) {
  console.log("i : ", i);
  // [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
  const firstCard = parseInt(Math.random() * cards.length); // ex) 1
  // 첫번째 카드 선택
  console.log("firstCard : " + firstCard);
  const secondCard = parseInt(Math.random() * cards.length); // ex) 6
  // 두번째 카드 선택
  console.log("secondCard : " + secondCard);
  const temp = cards[firstCard]; // << 1
  // temp = 1 / cards[firstCard] = 1
  // 첫번째 카드를 임시 저장
  console.log("temp : " + temp);
  console.log("cards[firstCard] : " + cards[firstCard]);
  cards[firstCard] = cards[secondCard]; // << 4
  // cards[firstCard] = 4 / cards[secondCard] = 4
  // 첫번째 카드 자리에 두번째 카드를 저장
  console.log("cards[firstCard] : " + cards[firstCard]);
  console.log("cards[secondCard] : " + cards[secondCard]);
  cards[secondCard] = temp;
  // cards[secondCard] = 1 / temp = 1
  // 두번째 카드 자리에 temp를 저장
  console.log("cards[secondCard] : " + cards[secondCard]);
  console.log("temp : " + temp);
}

console.log(cards);
// cards[23] = 90;
// console.log(cards[23]);
// console.log(cards.length);
