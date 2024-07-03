export const initGroupControllers = async (Group, Guest, GroupAnswer) => {
  const createGroup = async (request, response) => {
    try {
      const weddingId = request.params.id;
      const group = Group.build({ WeddingId: weddingId });
      await group.save();
      response.json(group);
    } catch (e) {
      response.error(e);
    }
  };

  const updateGroup = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const groups = await Group.findByPk(request.params.id);
      groups
        .update(request.body)
        .then(() => groups.save)
        .then(() => response.json({ [updatedField]: groups.get(updatedField) }))
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.error(e);
    }
  };

  const deleteGroup = async (request, response) => {
    try {
      const groupId = request.params.id;
      const groups = await Group.findByPk(groupId);
      await groups.destroy();

      await Guest.destroy({ where: { GroupId: groupId } });
      await GroupAnswer.destroy({ where: { GroupId: groupId } });

      response.json({ id: request.params.id });
    } catch (e) {
      response.error(e);
    }
  };

  const getGroup = async (request, response) => {
    return await Question.findByPk(id);
  };

  const getAllGroups = async (request, response) => {
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
    createGroup,
    updateGroup,
    deleteGroup,
    getGroup,
    getAllGroups,
  };
};
