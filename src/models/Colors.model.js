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
      wedding_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Wedding,
          key: "id",
        },
      },
    },
    { sequelize }
  );

  await Color.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(100).fill(1).map(() => ({
    hex: faker.color.rgb(),
    name: faker.color.human(),
    wedding_id: faker.number.int({ min: 1, max: 100 }),
  }));

  seed.map(async (s) => await Color.create(s));
};
