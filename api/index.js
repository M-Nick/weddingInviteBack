const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const initRoutes = require("./routes/routes.js").initRoutes;
const initSequelize = require("./db/init.js").initSequelize;
require("dotenv/config");

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

initSequelize()
  .then((sequelize) => initRoutes(app, sequelize.models))
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}.`);
    });
  })
  .catch((error) => console.error(error));
