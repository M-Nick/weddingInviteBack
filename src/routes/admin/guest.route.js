const initGuestControllers =
  require("../../controllers/admin/guest.controller.js").initGuestControllers;

exports.initGuestRoute = async (app, GuestModel) => {
  const controllers = await initGuestControllers(GuestModel);

  app.get("/groups/:id/guests", controllers.getAllGuests);
  app.get("/guests/:id", controllers.getGuest);
  app.post("/groups/:id/guests", controllers.createGuest);
  app.put("/guests/:id", controllers.updateGuest);
  app.delete("/guests/:id", controllers.deleteGuest);
};
