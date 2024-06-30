import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initGroupGuestModel = async (sequelize, Group, Guest) => {
  class GroupGuest extends Model {}

  GroupGuest.init(null, { sequelize });

  Group.Guest = Group.belongsToMany(Guest, {
    through: GroupGuest,
    as: "guests",
  });
  Guest.Group = Guest.belongsToMany(Group, {
    through: GroupGuest,
    as: "groups",
  });

  await GroupGuest.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const uuids = await sequelize.models.Group.findAll({ attributes: ["id"] });

  const seed = new Array(45).fill(1).map((_, index) => ({
    GroupId: faker.helpers.arrayElement(uuids.map(({ id }) => id)),
    GuestId: index + 1,
  }));

  seed.forEach(async (s) => await GroupGuest.create(s));
};
