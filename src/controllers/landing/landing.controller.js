exports.initLandingControllers = async (models) => {
  const { GroupAnswer, Wedding, Group, Guest, Color, Event, Question, Answer } =
    models;

  const getAllData = async (request, response) => {
    try {
      const GroupId = request.params.id;
      const group = await Group.findByPk(GroupId);
      const WeddingId = await group.get("WeddingId");
      const wedding = await Wedding.findByPk(WeddingId);

      const colors = await Color.findAll({
        attributes: ["hex", "id"],
        where: { WeddingId },
      });

      const groupData = {
        id: group.id,
        message: group.message,
        isConfirm: group.isConfirm,
        guests: await Guest.findAll({ where: { GroupId } }),
      };

      let questions = await Question.findAll({
        where: { WeddingId },
        attributes: ["id", "text"],
        include: {
          model: Answer,
          as: "answers",
          attributes: ["id", "text"],
          include: {
            model: GroupAnswer,
            as: "answers",
            attributes: ["answer", "GroupId"],
          },
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
        date: await wedding.get("date"),
        groupData: groupData,
        colors: colors,
        questions: questions,
        timetable: timetable,
      });
    } catch (e) {
      response.send({ error: e });
    }
  };

  return { getAllData };
};
