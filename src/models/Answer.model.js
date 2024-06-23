import { DataTypes, Model } from "sequelize";

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

  await Answer.sync({ force: true });
};
