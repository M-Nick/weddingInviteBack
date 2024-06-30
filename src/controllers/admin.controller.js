import { where } from "sequelize";

export const initAdminControllers = async (models) => {
  const {
    Wedding,
    Guest,
    Group,
    GroupGuest,
    Color,
    Event,
    Location,
    Question,
    Answer,
    GroupAnswer,
  } = models;

  const getAllData = async (request, response) => {
    const WeddingId = request.params.id;

    const colors = await Color.findAll({
      attributes: ["hex", "id"],
      where: { WeddingId },
    });

    const dbGroups = await Group.findAll({
      where: { WeddingId },
      attributes: ["id", "isConfirm", "message"],
      include: [
        {
          model: Guest,
          as: "guests",
          attributes: ["email", "name", "id", "phone", "sex"],
          through: { attributes: [] },
        },
        {
          model: Answer,
          as: "answers",
          attributes: ["id"],
          through: { attributes: ["answer"] },
        },
      ],
    });

    const groups = dbGroups.map((group) => ({
      id: group.id,
      message: group.message,
      guests: group.guests,
      answers: group.answers.map((answer) => ({
        id: answer.id,
        answer: answer.GroupAnswer.answer,
      })),
    }));

    const questions = await Question.findAll({
      where: { WeddingId },
      attributes: ["id", "text"],
      include: {
        model: Answer,
        as: "answers",
        attributes: ["id", "text"],
      },
    });

    const timetable = await Event.findAll({
      where: { WeddingId },
      attributes: [
        "id",
        "time",
        "name",
        "description",
        "locationName",
        "locationUrl",
        "locationAddress",
      ],
    });

    return response.json({
      groups: groups,
      colors: colors,
      questions: questions,
      timetable: timetable,
    });
  };

  return { getAllData };
};
