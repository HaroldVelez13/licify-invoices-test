const { authJwt } = require("../middlewares");
const invoiceController = require("../controllers/invoice.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  // Create a new Invoice
  app.post("/api/invoice/", [authJwt.verifyToken], invoiceController.create);

  // Retrieve all invoice
  app.get("/api/invoice/", [authJwt.verifyToken], invoiceController.findAll);

  // Retrieve a single invoice with id
  app.get("/api/invoice/:id", [authJwt.verifyToken], invoiceController.findOne);

  // Update a invoice with id
  app.put("/api/invoice/:id", [authJwt.verifyToken], invoiceController.update);

  // Delete a invoice with id
  app.delete(
    "/api/invoice/:id",
    [authJwt.verifyToken],
    invoiceController.delete
  );
};
