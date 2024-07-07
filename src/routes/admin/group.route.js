const initGroupControllers =
  require("../../controllers/admin/group.controller.js").initGroupControllers;

exports.initGroupRoute = async (
  app,
  GroupModel,
  GuestModel,
  GroupAnswerModel
) => {
  const controllers = await initGroupControllers(
    GroupModel,
    GuestModel,
    GroupAnswerModel
  );

  app.get("/api/weddings/:id/groups", controllers.getAllGroups);
  app.get("/api/groups/:id", controllers.getGroup);
  app.post("/api/weddings/:id/groups", controllers.createGroup);
  app.put("/api/groups/:id", controllers.updateGroup);
  app.delete("/api/groups/:id", controllers.deleteGroup);
};
