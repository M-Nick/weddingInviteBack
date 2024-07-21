const initEventControllers =
  require("../../controllers/admin/event.controller.js").initEventControllers;

exports.initEventRoute = async (app, EventModel) => {
  const controllers = await initEventControllers(EventModel);

  app.get("/api/events", controllers.getAllEvents);
  app.get("/api/events/:id", controllers.getEvent);
  // app.post("/api/events", controllers.createEvent);
  // app.put("/api/events/:id", controllers.updateEvent);
  // app.delete("/api/events/:id", controllers.deleteEvent);
};
