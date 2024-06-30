export const initEventControllers = async (Event) => {
  const createEvent = async (request, response) => {
    const event = Event.build(request.body);
    await event.save();
    response.json(event);
  };

  const updateEvent = async (request, response) => {
    const updatedField = Object.keys(request.body)[0];
    const event = await Event.findByPk(request.params.id);
    event
      .update(request.body)
      .then(() => event.save)
      .then(() => response.json({ [updatedField]: event.get(updatedField) }))
      .catch((e) => response.send({ error: e }));
  };

  const deleteEvent = async (request, response) => {
    const event = await Event.findByPk(request.params.id);
    await event.destroy();
    response.json({ id: request.params.id });
  };

  const getEvent = async (request, response) => {
    console.log(request);
    return await Event.findByPk(id);
  };

  const getAllEvents = async (request, response) => {
    console.log(request);
    try {
      const result = await Event.findAll().then((res) =>
        res.map((w) => w.dataValues)
      );
      response.json(result);
    } catch (e) {
      response.error(e);
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
