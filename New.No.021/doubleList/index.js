class Node {
  constructor(data) {
    // 하나의 데이터(점)이다.
    this.data = data;
    // 노드의 데이터
    this.prev = undefined;
    this.next = undefined;
    // 다음 노드
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  insert(data) {
    console.log("입력된 데이터는 ", data);
    if (!this.head) {
      console.log("헤드가 없다");
      this.head = this.tail = new Node(data);
      console.log("헤드는 ", this.head);
      console.log("테일은 ", this.tail);
    } else {
      console.log("헤드가 있다.");
      console.log("현재 테일의 다음 노드는 ", this.tail.next);
      this.tail.next = new Node(data);
      console.log("현재 테일의 다음 노드는 ", this.tail.next);
      // 끝에 다음 노드를 추가한다.
      this.tail.next.prev = this.tail;
      console.log("현재 테일의 다음 노드의 이전은 ", this.tail.next.prev);
      this.tail = this.tail.next;
      console.log("현재 테일은 ", this.tail);
    }
    this.size++;
  }
  remove(data) {
    let curr = this.head;
    if (!curr) return;
    if (curr.data === data) {
      // ?.은 curr가 객체인지 확인하고 data 프로퍼티를 가져온다.
      this.head = this.head.next;
      this.head.prev = null;
      this.size--;
      return curr.data;
    }
    while (curr !== this.tail) {
      if (curr.next.data === data) {
        const tempNode = curr.next;
        curr.next = tempNode.next;
        if (curr.next) curr.next.prev = curr;
        else this.tail = curr;
        --this.size;
        return tempNode.data;
      }
      curr = curr.next;
    }
  }
}

const testDouble = new DoubleLinkedList();
testDouble.insert("테스팅");
testDouble.insert("테스팅1");
testDouble.insert("테스팅2");
