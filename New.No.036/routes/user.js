const router = require("express").Router();

router.post("/regist", (req, res) => {
  console.log(req.body);
  res.end();
});

module.exports = router;
