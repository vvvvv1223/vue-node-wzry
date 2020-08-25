module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Goods = require("../../models/Goods");


  router.get("/goods", async (req, res) => {
    const items = await Goods.find().limit(10);
    res.send(items);
  });

  router.get("/goods/:id", async (req, res) => {
    const item = await Goods.findById(req.params.id)
    res.send(item);
  });

  router.post("/goods", async (req, res) => {
    const model = await Goods.create(req.body);
    res.send(model);
  });

  router.put("/goods/:id", async (req, res) => {
    const model = await Goods.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/goods/:id", async (req, res) => {
    const model = await Goods.findByIdAndRemove(req.params.id,req.body)
    res.send(model);
  });

  app.use("/api/admin", router);
};
