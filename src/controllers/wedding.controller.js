export const initWeddingControllers = async (Wedding) => {
  const createWedding = async (request, response) => {
    const wedding = Wedding.build({ date });
    return await wedding.save();
  };

  const updateWedding = async (request, response) => {
    console.log({ id, date });
    const wedding = await Wedding.findByPk(id);
    wedding.update({ date });
    wedding.save();
  };

  const deleteWedding = async (request, response) => {
    const wedding = await Wedding.findByPk(id);
    return await wedding.destroy();
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
      response.error(e);
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
