const initAdminControllers =
  require("../../controllers/admin/admin.controller.js").initAdminControllers;

exports.initAdminRoute = async (app, models) => {
  const { getAllData } = await initAdminControllers(models);

  app.get("/api/weddings/:id/settings", getAllData);
};
