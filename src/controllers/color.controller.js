import { faker } from "@faker-js/faker";

export const initColorControllers = async (Color) => {
  const createColor = async (request, response) => {
    const color = Color.build({ hex: faker.color.rgb() });
    await color.save();
    response.json(color);
  };

  const updateColor = async (request, response) => {
    const updatedField = Object.keys(request.body)[0];
    const color = await Color.findByPk(request.params.id);
    color
      .update(request.body)
      .then(() => color.save)
      .then(() => response.json({ [updatedField]: color.get(updatedField) }))
      .catch((e) => response.send({ error: e }));
  };

  const deleteColor = async (request, response) => {
    const color = await Color.findByPk(request.params.id);
    await color.destroy();
    response.json({ id: request.params.id });
  };

  const getColor = async (request, response) => {
    console.log(request);
    return await Color.findByPk(id);
  };

  const getAllColors = async (request, response) => {
    console.log(request);
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
