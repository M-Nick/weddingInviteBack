exports.initWeddingControllers = async (Wedding) => {
  const createWedding = async (request, response) => {
    try {
      const authorIp =
        request.headers["x-forwarded-for"] || request.socket.remoteAddress;
      const wedding = Wedding.build({ ...request.body, authorIp });
      await wedding.save();
      response.json(wedding);
    } catch (e) {
      response.send({ error: e });
    }
  };

  const updateWedding = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const weddings = await Wedding.findByPk(request.params.id);
      weddings
        .update(request.body)
        .then(() => weddings.save)
        .then(() =>
          response.json({ [updatedField]: weddings.get(updatedField) })
        )
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.send({ error: e });
    }
  };

  // TODO make wedding deleting delete all connected data!
  const deleteWedding = async (request, response) => {
    try {
      const weddings = await Wedding.findByPk(request.params.id);
      await weddings.destroy();
      response.json({ id: request.params.id });
    } catch (e) {
      response.send({ error: e });
    }
  };

  const getWedding = async (request, response) => {
    return await Wedding.findByPk(id);
  };

  const getAllWeddings = async (request, response) => {
    try {
      const result = await Wedding.findAll().then((res) =>
        res.map((w) => w.dataValues)
      );
      response.json(result);
    } catch (e) {
      response.send({ error: e });
    }
  };

  return {
    createWedding,
    updateWedding,
    deleteWedding,
    getWedding,
    getAllWeddings,
  };
};
