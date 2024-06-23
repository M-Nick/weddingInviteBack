import { DataTypes, Model } from "sequelize";
import { Wedding } from "./Wedding.js";
import Place from "./Place.js";
import { sequelize } from "./authenticate.js";

export class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING(63),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    wedding_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: Wedding,
        key: "id",
      },
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Place,
        key: "id",
      },
    },
  },
  { sequelize: sequelize }
);

Event.sync();
