import { faker } from "@faker-js/faker";

export const initColorControllers = async (Color) => {
  const createColor = async (request, response) => {
    try {
      const color = Color.build({ ...request.body, hex: faker.color.rgb() });
      await color.save();
      response.json(color);
    } catch (e) {
      response.error(e);
    }
  };

  const updateColor = async (request, response) => {
    try {
      const updatedField = Object.keys(request.body)[0];
      const color = await Color.findByPk(request.params.id);
      color
        .update(request.body)
        .then(() => color.save)
        .then(() => response.json({ [updatedField]: color.get(updatedField) }))
        .catch((e) => response.send({ error: e }));
    } catch (e) {
      response.error(e);
    }
  };

  const deleteColor = async (request, response) => {
    try {
      const color = await Color.findByPk(request.params.id);
      await color.destroy();
      response.json({ id: request.params.id });
    } catch (e) {
      response.error(e);
    }
  };

  const getColor = async (request, response) => {
    return await Color.findByPk(id);
  };

  const getAllColors = async (request, response) => {
    try {
      const result = await Color.findAll().then((res) =>
        res.map((w) => w.dataValues)
      );
      response.json(result);
    } catch (e) {
      response.error(e);
    }
  };

  return {
    createColor,
    updateColor,
    deleteColor,
    getColor,
    getAllColors,
  };
};
