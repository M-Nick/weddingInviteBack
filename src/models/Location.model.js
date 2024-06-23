import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initLocationModel = async (sequelize) => {
  class Location extends Model {}

  Location.init(
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

  await Location.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(100).fill(1).map(() => ({
    name: faker.location.state(),
    map_link: faker.internet.url(),
    image_name: faker.image.url(),
    address: faker.location.streetAddress(),
  }));

  seed.forEach(async (s) => await Location.create(s));
};
