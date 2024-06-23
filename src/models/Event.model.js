import { DataTypes, Model } from "sequelize";

export const initEventModel = async (sequelize, Wedding, Place) => {
  class Event extends Model {}

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
        references: {
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

  await Event.sync({ force: true });
};
