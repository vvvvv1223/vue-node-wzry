module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");

  /**
   * @swagger
   * /api/admin/categories:
   *   get:
   *     tags:
   *       - categories
   *     description: 展示分类全部数据
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/categories'
   */
  router.get("/categories", async (req, res) => {
    const items = await Category.find().populate('parent').limit(10);
    res.send(items);
  });

  /**
   * @swagger
   * /api/admin/categories:
   *   get:
   *     tags:
   *       - categories
   *     description: 根据id查询分类数据
   *     parameters:
   *       - id: categoryId
   *         in: query
   *         description: 分类id
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/categories'
   */
  router.get("/categories/:id", async (req, res) => {
    const item = await Category.findById(req.params.id)
    res.send(item);
  });

  /**
   * @swagger
   * /api/admin/categories:
   *   post:
   *     tags:
   *       - categories
   *     description: 添加分类数据
   *     parameters:
   *       - name: name
   *         in: query
   *         description: 分类名称
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: ok
   *         schema:
   *           $ref: '#/definitions/categories'
   */
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });

  /**
   * @swagger
   * /api/admin/categories:
   *   put:
   *     tags:
   *       - categories
   *     description: 编辑分类数据
   *     operationId: updateId
   *     responses:
   *       200:
   *         description: ok
   *       404:
   *         description: Category not found
   *         schema:
   *           $ref: '#/definitions/categories'
   */
  router.put("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  /**
   * @swagger
   * /api/admin/categories:
   *   delete:
   *     tags:
   *       - categories
   *     description: 删除某个分类
   *     operationId: deleteId
   *     responses:
   *       200:
   *         description: ok
   *       404:
   *         description: Category not found
   *         schema:
   *           $ref: '#/definitions/categories'
   */
  router.delete("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndRemove(req.params.id,req.body)
    res.send(model);
  });

  app.use("/api/admin", router);
};
