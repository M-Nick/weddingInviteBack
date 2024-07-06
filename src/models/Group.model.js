const faker = require("@faker-js/faker").faker;
const DataTypes = require("sequelize").DataTypes;
const Model = require("sequelize").Model;
const NEED_FORCE_SYNC = require("../configs/models.configs.js").NEED_FORCE_SYNC;
const NEED_SEEDS = require("../configs/models.configs.js").NEED_SEEDS;

exports.initGroupModel = async (sequelize, Wedding) => {
  class Group extends Model {}

  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isConfirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      message: {
        type: DataTypes.STRING(1024),
      },
    },
    { sequelize: sequelize }
  );

  Wedding.Group = Wedding.hasMany(Group, { as: "groups" });

  await Group.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(30).fill(1).map((_, index) => ({
    WeddingId: (index % 3) + 1,
    isConfirm: faker.datatype.boolean(),
    message: faker.lorem.words(faker.number.int({ min: 1, max: 20 })),
  }));

  seed.forEach(async (s) => await Group.create(s));
};
