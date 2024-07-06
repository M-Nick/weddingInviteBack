exports.initAnswerControllers = async (Answer, GroupAnswer) => {
  const createAnswer = async (request, response) => {
    try {
      const answer = Answer.build({ text: "", QuestionId: request.params.id });
      await answer.save();
      response.json(answer);
    } catch (e) {
      response.send({ error: e });
    }
  };

  const updateAnswer = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const answers = await Answer.findByPk(request.params.id);
      answers
        .update(request.body)
        .then(() => answers.save)
        .then(() =>
          response.json({ [updatedField]: answers.get(updatedField) })
        )
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.send({ error: e });
    }
  };

  const deleteAnswer = async (request, response) => {
    try {
      const answers = await Answer.findByPk(request.params.id);
      await answers.destroy();
      GroupAnswer.destroy({
        where: {
          AnswerId: request.params.id,
        },
      });
      response.json({ id: request.params.id });
    } catch (e) {
      response.send({ error: e });
    }
  };

  const getAnswer = async (request, response) => {
    return await Question.findByPk(id);
  };

  const getAllAnswers = async (request, response) => {
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
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswer,
    getAllAnswers,
  };
};
