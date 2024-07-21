const initColorControllers =
  require("../../controllers/admin/color.controller.js").initColorControllers;

exports.initColorRoute = async (app, ColorModel) => {
  const controllers = await initColorControllers(ColorModel);

  app.get("/api/colors", controllers.getAllColors);
  app.get("/api/colors/:id", controllers.getColor);
  // app.post("/api/colors", controllers.createColor);
  // app.put("/api/colors/:id", controllers.updateColor);
  // app.delete("/api/colors/:id", controllers.deleteColor);
};
