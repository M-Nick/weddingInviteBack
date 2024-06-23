import { DataTypes, Model } from "sequelize";

export const initGroupAnswerModel = async (sequelize, Group, Answer) => {
  class GroupAnswer extends Model {}

  GroupAnswer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

  await GroupAnswer.sync({ force: true });
};
