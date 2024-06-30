import { Sequelize } from "sequelize";

import { initModels } from "../models/index.js";

const DATABASE = "postgres";
const USERNAME = "postgres";
const PASSWORD = "1";

export const initSequelize = async () => {
  const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await initModels(sequelize);
    return sequelize;
  } catch (error) {
    throw new Error(error);
  }
};
