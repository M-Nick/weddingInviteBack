const initLandingControllers =
  require("../../controllers/landing/landing.controller.js").initLandingControllers;

exports.initLandingRoute = async (app, models) => {
  const { getAllData } = await initLandingControllers(models);

  app.get("/api/landing-data/:id", getAllData);
};
