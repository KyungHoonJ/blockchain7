const crypto = require("crypto-js");

console.log(crypto.SHA256("gdaldusinsaeukrb").toString());
// d431d4a14c6aa297bdc47d8db9259e39f095fca2de5d3dcc0720b895d4551c4e
// ... --- ...

console.log(crypto.SHA256("1").toString());
// 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b

console.log(crypto.MD5("asuehrblkuesbvr").toString());
// 3435e6cfa0259403b08b0ffddc201510

console.log(crypto.SHA1("123klusdabf").toString());
// 3342e4840b8c53abef27b6e197f4c8d9c4efa0f9

console.log(crypto.SHA512("1").toString());
// 4dff4ea340f0a823f15d3f4f01ab62eae0e5da579ccb851f8db9dfe84c58b2b37b89903a740e1ee172da793a6e79d560e5f7f9bd058a12a280433ed6fa46510a

console.log(crypto.RIPEMD160("123klusdabf").toString());
// e1d2047d9663a99bcd8af82b8262abf2627bf153

const tempAES = crypto.AES.encrypt("sklauerbvkluasebr", "key").toString(); // sklauerbvkluasebr
console.log(tempAES);
// U2FsdGVkX1/7snfMaw7bn75OpcR3E5S00xbO9g30eDO66iC1ODrQFLxRoxQ0KXma
console.log(crypto.AES.decrypt(tempAES, "key").toString(crypto.enc.Utf8));
