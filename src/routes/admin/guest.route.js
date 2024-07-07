const initGuestControllers =
  require("../../controllers/admin/guest.controller.js").initGuestControllers;

exports.initGuestRoute = async (app, GuestModel) => {
  const controllers = await initGuestControllers(GuestModel);

  app.get("/api/groups/:id/guests", controllers.getAllGuests);
  app.get("/api/guests/:id", controllers.getGuest);
  app.post("/api/groups/:id/guests", controllers.createGuest);
  app.put("/api/guests/:id", controllers.updateGuest);
  app.delete("/api/guests/:id", controllers.deleteGuest);
};
