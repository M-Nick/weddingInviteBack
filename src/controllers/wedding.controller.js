export const initWeddingControllers = async (Wedding) => {
  const createWedding = async (date) => {
    const wedding = Wedding.build({ date });
    return await wedding.save();
  };

  const updateWedding = async (id, date) => {
    console.log({ id, date });
    const wedding = await Wedding.findByPk(id);
    wedding.update({ date });
    wedding.save();
  };

  const deleteWedding = async (id) => {
    const wedding = await Wedding.findByPk(id);
    return await wedding.destroy();
  };

  const getWedding = async (id) => {
    return await Wedding.findByPk(id);
  };

  const getAllWeddings = async () => {
    return await Wedding.findAll().then((res) => res.map((w) => w.dataValues));
  };

  return {
    createWedding,
    updateWedding,
    deleteWedding,
    getWedding,
    getAllWeddings,
  };
};
