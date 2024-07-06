const Op = require("sequelize").Op;

exports.initGroupAnswerControllers = async (GroupAnswer) => {
  const setGroupAnswer = async (request, response) => {
    try {
      await GroupAnswer.findOrCreate({
        where: {
          [Op.and]: [
            {
              GroupId: request.params.id,
            },
            {
              AnswerId: request.params.answerId,
            },
          ],
        },
        defaults: {
          GroupId: request.params.id,
          AnswerId: request.params.answerId,
          ...request.body,
        },
      });

      const [groupAnswer] = await GroupAnswer.findAll({
        where: {
          [Op.and]: [
            {
              GroupId: request.params.id,
            },
            {
              AnswerId: request.params.answerId,
            },
          ],
        },
      });

      await groupAnswer.update(request.body);
      await GroupAnswer?.save?.();

      return response.json(groupAnswer);
    } catch (e) {
      response.send({ error: e });
    }
  };

  return { setGroupAnswer };
};
