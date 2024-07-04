import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { initRoutes } from "./routes/routes.js";
import { initSequelize } from "./db/init.js";
import "dotenv/config";

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
