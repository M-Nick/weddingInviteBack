exports.initGuestControllers = async (Guest) => {
  const createGuest = async (request, response) => {
    try {
      const groupId = request.params.id;
      const guest = Guest.build({ name: "", GroupId: request.params.id });
      await guest.save();
      response.json(guest);
    } catch (e) {
      response.send({ error: e });
    }
  };

  const updateGuest = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const guests = await Guest.findByPk(request.params.id);
      guests
        .update(request.body)
        .then(() => guests.save)
        .then(() => response.json({ [updatedField]: guests.get(updatedField) }))
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.send({ error: e });
    }
  };

  const deleteGuest = async (request, response) => {
    try {
      const guests = await Guest.findByPk(request.params.id);
      await guests.destroy();
      response.json({ id: request.params.id });
    } catch (e) {
      response.send({ error: e });
    }
  };

  const getGuest = async (request, response) => {
    return await Question.findByPk(id);
  };

  const getAllGuests = async (request, response) => {
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
    createGuest,
    updateGuest,
    deleteGuest,
    getGuest,
    getAllGuests,
  };
};
