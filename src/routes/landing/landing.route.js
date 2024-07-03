import { initLandingControllers } from "../../controllers/landing/landing.controller.js";

export const initLandingRoute = async (app, models) => {
  const { getAllData } = await initLandingControllers(models);

  app.get("/landing-data/:id", getAllData);
};
