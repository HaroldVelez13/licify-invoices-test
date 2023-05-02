const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Licify invoices",
    description: "Simple Api Backend Test Licify invoices",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./app/config/swagger.json";
const endpointsFiles = [
  "./app/routes/auth.routes.js",
  "./app/routes/invoice.routes.js",
  "./app/routes/item.routes.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc);
