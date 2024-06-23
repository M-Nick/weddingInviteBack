import { DataTypes, Model } from "sequelize";

export const initGuestModel = async (sequelize) => {
  class Guest extends Model {}

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
          isEmail: true,
        },
      },
    },
    { sequelize: sequelize }
  );

  await Guest.sync({ force: true });
};
