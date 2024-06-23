import { initAdminControllers } from "../controllers/admin.controller.js";

export const initAdminRoute = async (app, models) => {
  const { getAllData } = await initAdminControllers(models);

  app.get("/weddings/:id/settings", getAllData);
};
