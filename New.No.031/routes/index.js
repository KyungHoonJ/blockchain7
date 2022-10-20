import { Router } from "express";

const router = Router();
const todoList = [];

router
  .route("/list")
  // /api/list
  .get((req, res) => {
    res.send({
      list: todoList,
    });
  })
  .post((req, res) => {
    todoList.push({ text: req.body["name"], time: req.body.time });
    res.end();
  });

export default router;
// module.exports = router
