import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initQuestionModel = async (sequelize, Wedding) => {
  class Question extends Model {}

  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
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

  await Question.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(100).fill(1).map(() => ({
    text: faker.lorem.words(7),
    wedding_id: faker.number.int({ min: 1, max: 100 }),
  }));

  seed.forEach(async (s) => await Question.create(s));
};
