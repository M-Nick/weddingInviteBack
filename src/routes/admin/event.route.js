import { initEventControllers } from "../../controllers/admin/event.controller.js";

export const initEventRoute = async (app, EventModel) => {
  const controllers = await initEventControllers(EventModel);

  app.get("/events", controllers.getAllEvents);
  app.get("/events/:id", controllers.getEvent);
  app.post("/events", controllers.createEvent);
  app.put("/events/:id", controllers.updateEvent);
  app.delete("/events/:id", controllers.deleteEvent);
};
