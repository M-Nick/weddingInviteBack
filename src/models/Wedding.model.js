const {
  NEED_ALTER_SYNC,
  NEED_FORCE_SYNC,
  NEED_SEEDS,
} = require("../configs/models.configs.js");

const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;

exports.initWeddingModel = async (sequelize) => {
  class Wedding extends Model {}

  Wedding.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      authorName: {
        type: DataTypes.STRING,
      },
      authorWeddingDate: {
        type: DataTypes.DATE,
      },
      authorIp: {
        type: DataTypes.STRING,
      },
    },
    { sequelize: sequelize }
  );

  await Wedding.sync({ force: NEED_FORCE_SYNC, alter: NEED_ALTER_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(3).fill(1).map(() => ({
    date: faker.date.anytime(),
  }));

  seed.forEach(async (s) => await Wedding.create(s));
};
