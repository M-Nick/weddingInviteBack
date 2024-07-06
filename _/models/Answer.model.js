const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;
const NEED_FORCE_SYNC = require("../configs/models.configs.js").NEED_FORCE_SYNC;
const NEED_SEEDS = require("../configs/models.configs.js").NEED_SEEDS;

exports.initAnswerModel = async (sequelize, Question) => {
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
    },
    { sequelize: sequelize }
  );

  Question.Answer = Question.hasMany(Answer, { as: "answers" });

  await Answer.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(75).fill(1).map((_, index) => ({
    text: faker.lorem.word(),
    QuestionId: (index % 15) + 1,
  }));

  seed.forEach(async (s) => await Answer.create(s));
};
