import { DataTypes, Model } from "sequelize";

export const initGroupGuestModel = async (sequelize, Group, Guest) => {
  class GroupGuest extends Model {}

  GroupGuest.init(
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
      guest_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Guest,
          key: "id",
        },
      },
    },
    { sequelize }
  );

  await GroupGuest.sync({ force: true });
};
