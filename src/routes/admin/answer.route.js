const initAnswerControllers =
  require("../../controllers/admin/answer.controller.js").initAnswerControllers;

exports.initAnswerRoute = async (app, AnswerModel, GroupAnswerModel) => {
  const controllers = await initAnswerControllers(
    AnswerModel,
    GroupAnswerModel
  );

  app.get("/questions/:id/answers", controllers.getAllAnswers);
  app.get("/answers/:id", controllers.getAnswer);
  app.post("/questions/:id/answers", controllers.createAnswer);
  app.put("/answers/:id", controllers.updateAnswer);
  app.delete("/answers/:id", controllers.deleteAnswer);
};
