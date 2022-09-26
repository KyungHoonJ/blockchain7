function Node(data) {
  this.data = data;
  this.next = undefined;
}

function CircularLinkedList() {
  this.head = null;
  this.tail = null;
  this.size = 0;
}

CircularLinkedList.prototype.insert = function (data) {
  if (!this.head) {
    this.head = this.tail = new Node(data);
    this.head.next = this.head;
  } else {
    this.tail.next = new Node(data);
    this.tail.next.next = this.head;
    this.tail = this.tail.next;
  }
  this.size++;
};

CircularLinkedList.prototype.remove = function (data) {
  let curr = this.head;
  if (!curr) return;
  if (curr.data === data) {
    this.head = this.head.next;
    this.tail.next = this.head;
    this.size--;
    return curr.data;
  }
  while (curr !== this.tail) {
    if (curr.next.data === data) {
      const tempNode = curr.next;
      curr.next = tempNode.next;
      if (tempNode === this.tail) this.tail = curr;
      --this.size;
      return curr.data;
    }
    curr = curr.next;
  }
};

const testCircular = new CircularLinkedList();
