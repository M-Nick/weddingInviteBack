import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initEventModel = async (sequelize, Wedding, Location) => {
  class Event extends Model {}

  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      time: {
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING(63),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
    },
    { sequelize: sequelize }
  );

  Wedding.Event = Wedding.hasMany(Event, { as: "events" });
  Location.Event = Location.hasMany(Event, { as: "events" });
  Event.Location = Event.belongsTo(Location, { as: "location" });

  await Event.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(12).fill(1).map((_, index) => ({
    time: faker.date.anytime(),
    name: faker.lorem.words(5),
    description: faker.lorem.words(10),
    WeddingId: (index % 3) + 1,
  }));

  seed.forEach(async (s) => await Event.create(s));
};
