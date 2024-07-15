const {
  NEED_ALTER_SYNC,
  NEED_FORCE_SYNC,
  NEED_SEEDS,
} = require("../configs/models.configs.js");

const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;

exports.initEventModel = async (sequelize, Wedding) => {
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
      locationName: {
        type: DataTypes.STRING(127),
      },
      locationUrl: {
        type: DataTypes.STRING(511),
      },
      locationAddress: {
        type: DataTypes.STRING(255),
      },
    },
    { sequelize: sequelize }
  );

  Wedding.Event = Wedding.hasMany(Event, { as: "events" });

  await Event.sync({ force: NEED_FORCE_SYNC, alter: NEED_ALTER_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(12).fill(1).map((_, index) => ({
    time: faker.date.anytime(),
    name: faker.lorem.words(5),
    description: faker.lorem.words(10),
    WeddingId: (index % 3) + 1,
    locationName: faker.lorem.words(4),
    locationUrl: faker.internet.url(),
    locationAddress: faker.location.secondaryAddress(),
  }));

  seed.forEach(async (s) => await Event.create(s));
};
