import { initGroupAnswerControllers } from "../../controllers/admin/groupAnswer.controller.js";

export const initGroupAnswerRoute = async (app, GroupAnswer) => {
  const { setGroupAnswer } = await initGroupAnswerControllers(GroupAnswer);

  app.put("/groups/:id/answers/:answerId", setGroupAnswer);
};
