const initColorControllers =
  require("../../controllers/admin/color.controller.js").initColorControllers;

exports.initColorRoute = async (app, ColorModel) => {
  const controllers = await initColorControllers(ColorModel);

  app.get("/colors", controllers.getAllColors);
  app.get("/colors/:id", controllers.getColor);
  app.post("/colors", controllers.createColor);
  app.put("/colors/:id", controllers.updateColor);
  app.delete("/colors/:id", controllers.deleteColor);
};
