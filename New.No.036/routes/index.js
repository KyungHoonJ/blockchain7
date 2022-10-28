const router = require("express").Router();

const user = require("./user.js");

router.use("/user", user);

module.exports = router;
