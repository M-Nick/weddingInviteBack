exports.initEventControllers = async (Event) => {
  const createEvent = async (request, response) => {
    try {
      const event = Event.build(request.body);
      await event.save();
      response.json(event);
    } catch (e) {
      response.send({ error: e });
    }
  };

  const updateEvent = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const event = await Event.findByPk(request.params.id);
      event
        .update(request.body)
        .then(() => event.save)
        .then(() => response.json({ [updatedField]: event.get(updatedField) }))
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.send({ error: e });
    }
  };

  const deleteEvent = async (request, response) => {
    try {
      const event = await Event.findByPk(request.params.id);
      await event.destroy();
      response.json({ id: request.params.id });
    } catch (e) {
      response.send({ error: e });
    }
  };

  const getEvent = async (request, response) => {
    return await Event.findByPk(id);
  };

  const getAllEvents = async (request, response) => {
    try {
      const result = await Event.findAll().then((res) =>
        res.map((w) => w.dataValues)
      );
      response.json(result);
    } catch (e) {
      response.send({ error: e });
    }
  };

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getAllEvents,
  };
};
