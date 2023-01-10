const TestClass = require("./class");

describe("Class Test", () => {
  it("private test", () => {
    const test = new TestClass(5);
    expect(typeof test).toBe("object");

    expect(test.value).toBe(50);

    expect(test.add()).toBe(55);
    expect(TestClass.add(1, 2)).toBe(3);

    test.value = 100;
    expect(test.value).toBe(100);

    // test.#privateValue 으로는 사용할 수 없다.
    expect(test.privateValue).toBe(5);

    test.privateValue = 200; // set 사용
    expect(test.privateValue).toBe(200);
  });
});
