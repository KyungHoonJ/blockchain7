const keythereum = require("keythereum");

const address = "0x3c57a5e977d4b13fe418600cae9abb2a4f5c249d";
// 0x3c57a5e977d4b13fe418600cae9abb2a4f5c249d
// 0x3C57a5E977D4b13fe418600cAE9ABb2A4f5c249D

const keyObj = keythereum.importFromFile(address, __dirname);

const privateKey = keythereum.recover("1", keyObj);

console.log(privateKey.toString("hex"));
