const {
  NEED_ALTER_SYNC,
  NEED_FORCE_SYNC,
  NEED_SEEDS,
} = require("../configs/models.configs.js");

const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;

exports.initColorModel = async (sequelize, Wedding) => {
  class Color extends Model {}

  Color.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hex: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
    },
    { sequelize }
  );

  Wedding.Color = Wedding.hasMany(Color, { as: "colors" });

  await Color.sync({ force: NEED_FORCE_SYNC, alter: NEED_ALTER_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(12).fill(1).map((_, index) => ({
    hex: faker.color.rgb(),
    WeddingId: (index % 3) + 1,
  }));

  seed.map(async (s) => await Color.create(s));
};
