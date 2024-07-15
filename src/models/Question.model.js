const {
  NEED_ALTER_SYNC,
  NEED_FORCE_SYNC,
  NEED_SEEDS,
} = require("../configs/models.configs.js");

const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;

exports.initQuestionModel = async (sequelize, Wedding) => {
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
    },
    { sequelize }
  );

  Wedding.Question = Wedding.hasMany(Question, { as: "questions" });

  await Question.sync({ force: NEED_FORCE_SYNC, alter: NEED_ALTER_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(15).fill(1).map((_, index) => ({
    text: faker.lorem.words(faker.number.int({ min: 3, max: 10 })),
    WeddingId: (index % 3) + 1,
  }));

  seed.forEach(async (s) => await Question.create(s));
};
