import { DataTypes, Model } from "sequelize";
import { sequelize } from "./authenticate.js";
import { Question } from "./Question.js";

export class Answer extends Model {}

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

Answer.sync();
