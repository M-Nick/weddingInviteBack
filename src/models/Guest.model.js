import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

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

  await Guest.sync({ force: NEED_FORCE_SYNC, as: "guests" });

  if (!NEED_SEEDS) return;

  const seed = new Array(45).fill(1).map(() => ({
    name: faker.person.fullName(),
    sex: faker.helpers.arrayElement(["male", "female"]),
    phone: faker.string.numeric(11),
    email: faker.internet.email(),
  }));

  seed.forEach(async (s) => await Guest.create(s));
};
