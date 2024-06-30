import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initWeddingModel = async (sequelize) => {
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
    },
    { sequelize: sequelize }
  );

  await Wedding.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(3).fill(1).map(() => ({
    date: faker.date.anytime(),
  }));

  seed.forEach(async (s) => await Wedding.create(s));
};
