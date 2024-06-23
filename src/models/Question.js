import { DataTypes, Model } from "sequelize";
import { sequelize } from "./authenticate.js";
import { Wedding } from "./Wedding.js";

export class Question extends Model {}

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

Question.sync();
