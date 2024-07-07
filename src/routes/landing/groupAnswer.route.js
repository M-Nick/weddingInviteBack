const initGroupAnswerControllers =
  require("../../controllers/admin/groupAnswer.controller.js").initGroupAnswerControllers;

exports.initGroupAnswerRoute = async (app, GroupAnswer) => {
  const { setGroupAnswer } = await initGroupAnswerControllers(GroupAnswer);

  app.put("/api/groups/:id/answers/:answerId", setGroupAnswer);
};
