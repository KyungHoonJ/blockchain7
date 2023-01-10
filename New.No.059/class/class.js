class ParentTestClass {
  #privateValue;

  constructor(value) {
    this.#privateValue = value;
    this.value = value * 10;
  }

  get privateValue() {
    // 보통은 private 키를 가져올 때 사용한다.
    return this.#privateValue;
  }

  set privateValue(value) {
    this.#privateValue = value;
  }

  add() {
    // class.test.js에서 test.add() / 10번째 줄에서 사용
    return this.#privateValue + this.value;
  }

  static add(a, b) {
    // class.test.js에서 TestClass.add(1, 2) / 11번째 줄에서 사용
    return a + b;
  }
}

class TestClass extends ParentTestClass {
  constructor(value) {
    super(value);
    // console.log(this.#privateValue)
  }
}

module.exports = TestClass;
