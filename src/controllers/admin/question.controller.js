export const initQuestionControllers = async (
  Question,
  Answer,
  GroupAnswer
) => {
  const createQuestion = async (request, response) => {
    try {
      const question = Question.build({ text: "", ...request.body });
      await question.save();
      response.json(question);
    } catch (e) {
      response.send({ error: e });
    }
  };

  const updateQuestion = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const question = await Question.findByPk(request.params.id);
      question
        .update(request.body)
        .then(() => question.save)
        .then(() =>
          response.json({ [updatedField]: question.get(updatedField) })
        )
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.send({ error: e });
    }
  };

  const deleteQuestion = async (request, response) => {
    try {
      const id = request.params.id;
      const question = await Question.findByPk(id);
      const answers = await Answer.findAll({
        where: { QuestionId: id },
        attributes: ["id"],
      });
      await JSON.parse(JSON.stringify(answers)).forEach(
        async ({ id }) => await GroupAnswer.destroy({ where: { AnswerId: id } })
      );
      await Answer.destroy({
        where: {
          QuestionId: id,
        },
      });
      await question.destroy();
      response.json({ id: request.params.id });
    } catch (e) {
      response.send({ error: e });
    }
  };

  const getQuestion = async (request, response) => {
    return await Question.findByPk(id);
  };

  const getAllQuestions = async (request, response) => {
    try {
      const result = await Question.findAll().then((res) =>
        res.map((w) => w.dataValues)
      );
      response.json(result);
    } catch (e) {
      response.send({ error: e });
    }
  };

  return {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getAllQuestions,
  };
};
