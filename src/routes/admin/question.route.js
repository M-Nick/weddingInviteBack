const initQuestionControllers =
  require("../../controllers/admin/question.controller.js").initQuestionControllers;

exports.initQuestionRoute = async (
  app,
  QuestionModel,
  AnswerModel,
  GroupAnswer
) => {
  const controllers = await initQuestionControllers(
    QuestionModel,
    AnswerModel,
    GroupAnswer
  );

  app.get("/api/questions", controllers.getAllQuestions);
  app.get("/api/questions/:id", controllers.getQuestion);
  // app.post("/api/questions", controllers.createQuestion);
  // app.put("/api/questions/:id", controllers.updateQuestion);
  // app.delete("/api/questions/:id", controllers.deleteQuestion);
};
