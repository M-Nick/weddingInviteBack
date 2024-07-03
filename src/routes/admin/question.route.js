import { initQuestionControllers } from "../../controllers/admin/question.controller.js";

export const initQuestionRoute = async (
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

  app.get("/questions", controllers.getAllQuestions);
  app.get("/questions/:id", controllers.getQuestion);
  app.post("/questions", controllers.createQuestion);
  app.put("/questions/:id", controllers.updateQuestion);
  app.delete("/questions/:id", controllers.deleteQuestion);
};
