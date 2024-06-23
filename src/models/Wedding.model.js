import { DataTypes, Model } from "sequelize";

export const initWeddingModel = async (sequelize) => {
  class Wedding extends Model {}

  Wedding.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { sequelize: sequelize }
  );

  await Wedding.sync({ force: true });
};
