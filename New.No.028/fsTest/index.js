const fs = require("fs");
const fsProm = fs.promises;
fsProm
  .readFile("./test.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });
