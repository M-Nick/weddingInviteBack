export const initAnswerControllers = async (Answer, GroupAnswer) => {
  const createAnswer = async (request, response) => {
    const answer = Answer.build({ text: "", QuestionId: request.params.id });
    await answer.save();
    response.json(answer);
  };

  const updateAnswer = async (request, response) => {
    const updatedField = Object.keys(request.body)[0];
    const answers = await Answer.findByPk(request.params.id);
    answers
      .update(request.body)
      .then(() => answers.save)
      .then(() => response.json({ [updatedField]: answers.get(updatedField) }))
      .catch((e) => response.send({ error: e }));
  };

  const deleteAnswer = async (request, response) => {
    const answers = await Answer.findByPk(request.params.id);
    await answers.destroy();
    GroupAnswer.destroy({
      where: {
        AnswerId: request.params.id,
      },
    });
    response.json({ id: request.params.id });
  };

  const getAnswer = async (request, response) => {
    console.log(request);
    return await Question.findByPk(id);
  };

  const getAllAnswers = async (request, response) => {
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
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswer,
    getAllAnswers,
  };
};
