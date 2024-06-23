import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initGroupAnswerModel = async (sequelize, Group, Answer) => {
  class GroupAnswer extends Model {}

  GroupAnswer.init(
    {
      answer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { sequelize }
  );

  Group.Answer = Group.belongsToMany(Answer, { through: GroupAnswer });
  Answer.Group = Answer.belongsToMany(Group, { through: GroupAnswer });

  await GroupAnswer.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const uuids = await sequelize.models.Group.findAll({ attributes: ["id"] });

  const seed = new Array(100).fill(1).map(() => ({
    answer: faker.datatype.boolean(),
    GroupId: faker.helpers.arrayElement(uuids.map(({ id }) => id)),
    AnswerId: faker.number.int({ min: 1, max: 100 }),
  }));

  seed.forEach(async (s) => await GroupAnswer.create(s));
};
