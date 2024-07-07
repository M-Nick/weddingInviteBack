const initAnswerControllers =
  require("../../controllers/admin/answer.controller.js").initAnswerControllers;

exports.initAnswerRoute = async (app, AnswerModel, GroupAnswerModel) => {
  const controllers = await initAnswerControllers(
    AnswerModel,
    GroupAnswerModel
  );

  app.get("/api/questions/:id/answers", controllers.getAllAnswers);
  app.get("/api/answers/:id", controllers.getAnswer);
  app.post("/api/questions/:id/answers", controllers.createAnswer);
  app.put("/api/answers/:id", controllers.updateAnswer);
  app.delete("/api/answers/:id", controllers.deleteAnswer);
};
