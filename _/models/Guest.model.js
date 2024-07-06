const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;
const NEED_FORCE_SYNC = require("../configs/models.configs.js").NEED_FORCE_SYNC;
const NEED_SEEDS = require("../configs/models.configs.js").NEED_SEEDS;

exports.initGuestModel = async (sequelize, Group) => {
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
      },
      sex: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
      },
    },
    { sequelize: sequelize }
  );

  Group.Guest = Group.hasMany(Guest, { as: "guests" });

  await Guest.sync({ force: NEED_FORCE_SYNC, as: "guests" });

  if (!NEED_SEEDS) return;

  const uuids = await sequelize.models.Group.findAll({ attributes: ["id"] });

  const seed = new Array(45).fill(1).map(() => ({
    name: faker.person.fullName(),
    sex: faker.helpers.arrayElement(["male", "female"]),
    GroupId: faker.helpers.arrayElement(uuids.map(({ id }) => id)),
  }));

  seed.forEach(async (s) => await Guest.create(s));
};
