module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const AdminUser = require("../../models/AdminUser");

  router.get("/adminusers",async (req, res) => {
    const items = await AdminUser.find().limit(10);
    res.send(items);
  });

  router.get("/adminusers/:id", async (req, res) => {
    const item = await AdminUser.findById(req.params.id)
    res.send(item);
  });

  router.post("/adminusers", async (req, res) => {
    const model = await AdminUser.create(req.body);
    res.send(model);
  });

  router.put("/adminusers/:id", async (req, res) => {
    const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/adminusers/:id", async (req, res) => {
    const model = await AdminUser.findByIdAndRemove(req.params.id,req.body)
    res.send(model);
  });
  
  app.use("/api/admin", router);
};
