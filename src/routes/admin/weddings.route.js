const initWeddingControllers =
  require("../../controllers/admin/wedding.controller.js").initWeddingControllers;

exports.initWeddingRoute = async (app, WeddingModel) => {
  const controllers = await initWeddingControllers(WeddingModel);

  app.get("/api/weddings", controllers.getAllWeddings);
  app.get("/api/weddings/:id", controllers.getWedding);
  // app.post("/api/weddings", controllers.createWedding);
  // app.put("/api/weddings/:id", controllers.updateWedding);
  // app.delete("/api/weddings/:id", controllers.deleteWedding);
};
