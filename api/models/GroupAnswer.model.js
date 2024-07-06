const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;
const NEED_FORCE_SYNC = require("../configs/models.configs.js").NEED_FORCE_SYNC;
const NEED_SEEDS = require("../configs/models.configs.js").NEED_SEEDS;

exports.initGroupAnswerModel = async (sequelize, Group, Answer) => {
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

  Group.Answer = Group.belongsToMany(Answer, {
    through: GroupAnswer,
    as: "answers",
  });
  Answer.Group = Answer.belongsToMany(Group, {
    through: GroupAnswer,
    as: "groups",
  });
  Answer.GroupAnswer = Answer.hasMany(GroupAnswer, { as: "answers" });

  await GroupAnswer.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const uuids = await sequelize.models.Group.findAll({ attributes: ["id"] });

  const seed = new Array(75).fill(1).map((_, index) => ({
    answer: faker.datatype.boolean(),
    GroupId: faker.helpers.arrayElement(uuids.map(({ id }) => id)),
    AnswerId: index + 1,
  }));

  seed.forEach(async (s) => await GroupAnswer.create(s));
};
