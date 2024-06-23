import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initAnswerModel = async (sequelize, Question) => {
  class Answer extends Model {}

  Answer.init(
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
      question_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Question,
          key: "id",
        },
      },
    },
    { sequelize: sequelize }
  );

  await Answer.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(100).fill(1).map(() => ({
    text: faker.lorem.word(),
    question_id: faker.number.int({ min: 1, max: 100 }),
  }));

  seed.forEach(async (s) => await Answer.create(s));
};
