const Test = artifacts.require("Test");

contract("Test", (accounts) => {
  console.log(accounts);
  let test;

  describe("Test Contract", () => {
    it("deploy", async () => {
      test = await Test.deployed();
    });

    it("getText", async () => {
      console.log(await test.getText.call());
    });

    it("setText", async () => {
      await test.setText("Hi! Block7");
      console.log(await test.getText.call());
    });
  });
});
