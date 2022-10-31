const router = require("express").Router();

const { Table1, Table2 } = require("../models/index.js");

router.get("/", async (req, res) => {
  const { body, query } = req;
  const options = {};
  if (query.id) {
    options.where = {
      id: query.id,
    };
  }
  const tempTables = await Table2.findAll(options);
  res.send({ name: "get", body, query, tempTables });
});

router.post("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.create({
    column3: body.column3,
    column4: body.column4,
  });
  res.send({ name: "post", body, query, tempTable });
});

router.put("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.update(
    {
      column3: body.column3,
      column4: body.column4,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
  res.send({ name: "put", body, query, tempTable });
});

router.patch("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.update(
    {
      column3: body.column3,
    },
    {
      where: {
        id: body.id,
      },
    }
  );
  res.send({ name: "patch", body, query, tempTable });
});

router.patch("/associate", async (req, res) => {
  const { body, query } = req;
  if (body.column2) {
    const tempTable1 = await Table1.findOne({
      where: { column2: body.column2 },
    });
    const tempTable2 = await Table2.findOne({ where: { id: body.id } });
    tempTable1.addTable2s(tempTable2);
    // Table1을 기준으로 Table2를 추가한다.
    // 추가할 때 메서드는 add + 우리가 as 설정한 텍스트다.

    res.send({ name: "patch", body, query, tempTable1 });
  } else {
    const tempTable1 = await Table2.findOne({ where: { id: body.id1 } });
    const tempTable2 = await Table2.findOne({ where: { id: body.id2 } });
    tempTable1.addToTable2s(tempTable2);
    tempTable2.addFromTable2s(tempTable1);
    // 네이버의 서로이웃

    res.send({ name: "patch", body, query, tempTable1 });
  }
});

router.delete("/", async (req, res) => {
  const { body, query } = req;
  const tempTable = await Table2.destroy({
    where: {
      id: query.id,
    },
  });
  res.send({ name: "delete", body, query, tempTable });
});

module.exports = router;
