const router = require("express").Router();
const { authJwt } = require("../middlewares");
const itemController = require("../controllers/item.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  // Create a new Item
  app.post("/api/item/", [authJwt.verifyToken], itemController.create);

  // Retrieve all Item
  app.get("/api/item/", [authJwt.verifyToken], itemController.findAll);

  // Retrieve a single Item with id
  app.get("/api/item/:id", [authJwt.verifyToken], itemController.findOne);

  // Update a Item with id
  app.put("/api/item/:id", [authJwt.verifyToken], itemController.update);

  // Delete a Item with id
  app.delete("/api/item/:id", [authJwt.verifyToken], itemController.delete);
};
