import { DataTypes, Model } from "sequelize";

export const initPlaceModel = async (sequelize) => {
  class Place extends Model {}

  Place.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      map_link: {
        type: DataTypes.STRING(1023),
        unique: true,
      },
      image_name: {
        type: DataTypes.STRING(127),
        unique: true,
      },
      address: {
        type: DataTypes.STRING(255),
      },
    },
    { sequelize: sequelize }
  );

  await Place.sync({ force: true });
};
