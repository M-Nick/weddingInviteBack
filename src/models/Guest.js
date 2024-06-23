import { DataTypes, Model } from "sequelize";
import emailRegex from "email-regex";

import { sequelize } from "./authenticate.js";

export class Guest extends Model {}

Guest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM,
      values: ["male", "female"],
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        is: emailRegex({ exact: true }),
      },
    },
  },
  { sequelize: sequelize }
);

Guest.sync();
