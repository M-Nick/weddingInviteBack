import { initColorControllers } from "../../controllers/admin/color.controller.js";

export const initColorRoute = async (app, ColorModel) => {
  const controllers = await initColorControllers(ColorModel);

  app.get("/colors", controllers.getAllColors);
  app.get("/colors/:id", controllers.getColor);
  app.post("/colors", controllers.createColor);
  app.put("/colors/:id", controllers.updateColor);
  app.delete("/colors/:id", controllers.deleteColor);
};
