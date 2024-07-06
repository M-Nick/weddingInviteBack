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

  app.get("/weddings/:id/groups", controllers.getAllGroups);
  app.get("/groups/:id", controllers.getGroup);
  app.post("/weddings/:id/groups", controllers.createGroup);
  app.put("/groups/:id", controllers.updateGroup);
  app.delete("/groups/:id", controllers.deleteGroup);
};
