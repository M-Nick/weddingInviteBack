import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initGroupAnswerModel = async (sequelize, Group, Answer) => {
  class GroupAnswer extends Model {}

  GroupAnswer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      answer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.UUID,
        references: {
          model: Group,
          key: "id",
        },
      },
      answer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Answer,
          key: "id",
        },
      },
    },
    { sequelize }
  );

  await GroupAnswer.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const uuids = await sequelize.models.Group.findAll({ attributes: ["id"] });

  const seed = new Array(100).fill(1).map(() => ({
    answer: faker.datatype.boolean(),
    group_id: faker.helpers.arrayElement(uuids.map(({ id }) => id)),
    answer_id: faker.number.int({ min: 1, max: 100 }),
  }));

  seed.forEach(async (s) => await GroupAnswer.create(s));
};
