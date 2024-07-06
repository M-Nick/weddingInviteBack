const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const initRoutes = require("./routes/routes.js").initRoutes;
const initSequelize = require("./db/init.js").initSequelize;
require("dotenv/config");

(async () => {
  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  await initSequelize()
    .then((sequelize) => initRoutes(app, sequelize.models))
    .catch((error) => console.error(error));

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
})();
