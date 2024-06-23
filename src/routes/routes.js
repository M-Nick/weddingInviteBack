export const initRoutes = (app, models) => {
  app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
  });

  // app.get("/users", db.getUsers);
  // app.get("/users/:id", db.getUserById);
  // app.post("/users", db.createUser);
  // app.put("/users/:id", db.updateUser);
  // app.delete("/users/:id", db.deleteUser);
};
