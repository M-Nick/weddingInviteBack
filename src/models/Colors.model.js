import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initColorModel = async (sequelize, Wedding) => {
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
      name: {
        type: DataTypes.STRING(31),
      },
    },
    { sequelize }
  );

  Wedding.Color = Wedding.hasMany(Color, { as: "colors" });

  await Color.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(12).fill(1).map((_, index) => ({
    hex: faker.color.rgb(),
    name: faker.color.human(),
    WeddingId: (index % 3) + 1,
  }));

  seed.map(async (s) => await Color.create(s));
};
