import { DataTypes, Model } from "sequelize";

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

  await Question.sync({ force: true });
};
