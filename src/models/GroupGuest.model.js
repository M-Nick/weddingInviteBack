import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initGroupGuestModel = async (sequelize, Group, Guest) => {
  class GroupGuest extends Model {}

  GroupGuest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: DataTypes.UUID,
        references: {
          model: Group,
          key: "id",
        },
      },
      guest_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Guest,
          key: "id",
        },
      },
    },
    { sequelize }
  );

  await GroupGuest.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const uuids = await sequelize.models.Group.findAll({ attributes: ["id"] });

  const seed = new Array(100).fill(1).map(() => ({
    group_id: faker.helpers.arrayElement(uuids.map(({ id }) => id)),
    guest_id: faker.number.int({ min: 1, max: 100 }),
  }));

  seed.forEach(async (s) => await GroupGuest.create(s));
};
