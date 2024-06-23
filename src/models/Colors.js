import { DataTypes, Model } from "sequelize";
import { sequelize } from "./authenticate.js";
import { Wedding } from "./Wedding.js";

export class Color extends Model {}

Color.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hex: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(31),
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

Color.sync();
