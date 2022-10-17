const fs = require("fs");

fs.readFile("/index.js", (err, data) => {
  console.log(data);
});
