const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend Test Licify invoices",
      version: "1.0.0",
    },
  },
  apis: ["../routes/*.routes.js"],
};

const swaggerDocument = swaggerJsdoc(options);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.get("/api/doc/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
