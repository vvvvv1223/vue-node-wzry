module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Hero = require("../../models/Hero");

  router.get("/heros", async (req, res) => {
    const items = await Hero.find().limit(10);
    res.send(items);
  });

  router.get("/heros/:id", async (req, res) => {
    const item = await Hero.findById(req.params.id)
    res.send(item);
  });

  router.post("/heros", async (req, res) => {
    const model = await Hero.create(req.body);
    res.send(model);
  });

  router.put("/heros/:id", async (req, res) => {
    const model = await Hero.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/heros/:id", async (req, res) => {
    const model = await Hero.findByIdAndRemove(req.params.id,req.body)
    res.send(model);
  });

  app.use("/api/admin", router);
};
