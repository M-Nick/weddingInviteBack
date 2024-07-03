import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initGuestModel = async (sequelize, Group) => {
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
