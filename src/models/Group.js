import { DataTypes, Model } from "sequelize";
import { sequelize } from "./authenticate.js";
import { Guest } from "./Guest.js";
import { Wedding } from "./Wedding.js";

export class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    guest_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Guest,
        key: "id",
      },
    },
    wedding_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Wedding,
        key: "id",
      },
    },
    is_confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    message: {
      type: DataTypes.STRING(1024),
    },
  },
  { sequelize: sequelize }
);

Group.sync();
