const router = require("express").Router();

router.get("/", (req, res) => {
  res.end();
});

router.post("/add", (req, res) => {
  console.log(req.body);
  res.end();
});

router.put("/update", (req, res) => {
  res.end();
});

router.delete("/delete", (req, res) => {
  res.end();
});

module.exports = router;
