import express from "express";
import bodyParser from "body-parser";
import { testController } from "./controllers/Test.controller.js";
import { initRoutes } from "./routes/routes.js";
import { initSequelize } from "./db/init.js";

(async () => {
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const sequelize = await initSequelize();
  const models = sequelize.models;

  await initRoutes(app, models);

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });
})();
