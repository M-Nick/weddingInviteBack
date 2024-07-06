const Sequelize = require("sequelize").Sequelize;
const initModels = require("../models/index.js").initModels;

const {
  DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_SSL,
} = process.env;

console.log({
  DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_SSL,
});

const getSsl = (needSsl) => {
  return needSsl
    ? {
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
          },
        },
      }
    : {};
};

exports.initSequelize = async () => {
  const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    ...getSsl(Boolean(DB_SSL)),
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
