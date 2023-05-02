const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { DB_URL, ORIGIN_URL, APP_PORT } = require("./app/config/db.config");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./app/config/swagger.json");

// Cors
app.use(cors({ origin: "https://licify-invoices-test.vercel.app/" }));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: "licify-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Licify Invoice Application." });
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/invoice.routes")(app);

// set port, listen for requests
const PORT = APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
    }
  });
}
