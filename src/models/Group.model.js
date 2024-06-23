import { DataTypes, Model } from "sequelize";

export const initGroupModel = async (sequelize, Wedding) => {
  class Group extends Model {}

  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  await Group.sync({ force: true });
};
