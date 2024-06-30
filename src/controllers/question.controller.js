export const initQuestionControllers = async (
  Question,
  Answer,
  GroupAnswer
) => {
  const createQuestion = async (request, response) => {
    const question = Question.build({ text: "", ...request.body });
    await question.save();
    response.json(question);
  };

  const updateQuestion = async (request, response) => {
    const updatedField = Object.keys(request.body)[0];
    const question = await Question.findByPk(request.params.id);
    question
      .update(request.body)
      .then(() => question.save)
      .then(() => response.json({ [updatedField]: question.get(updatedField) }))
      .catch((e) => response.send({ error: e }));
  };

  const deleteQuestion = async (request, response) => {
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
  };

  const getQuestion = async (request, response) => {
    console.log(request);
    return await Question.findByPk(id);
  };

  const getAllQuestions = async (request, response) => {
    console.log(request);
    try {
      const result = await Question.findAll().then((res) =>
        res.map((w) => w.dataValues)
      );
      response.json(result);
    } catch (e) {
      response.error(e);
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
