import { initAdminRoute } from "./admin.route.js";
import { initWeddingRoute } from "./weddings.route.js";

export const initRoutes = async (app, models) => {
  app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
  });

  await initWeddingRoute(app, models.Wedding);
  await initAdminRoute(app, models);
};
