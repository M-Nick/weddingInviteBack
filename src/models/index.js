import { initWeddingModel } from "./Wedding.model.js";

export const initModels = async (sequelize) => {
  await initWeddingModel(sequelize);
};
