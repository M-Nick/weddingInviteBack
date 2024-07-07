const initWeddingControllers =
  require("../../controllers/admin/wedding.controller.js").initWeddingControllers;

exports.initWeddingRoute = async (app, WeddingModel) => {
  const controllers = await initWeddingControllers(WeddingModel);

  app.get("/weddings", controllers.getAllWeddings);
  app.get("/api/weddings", controllers.getAllWeddings);
  app.get("/weddings/:id", controllers.getWedding);
  app.post("/weddings", controllers.createWedding);
  app.put("/weddings/:id", controllers.updateWedding);
  app.delete("/weddings/:id", controllers.deleteWedding);
};
