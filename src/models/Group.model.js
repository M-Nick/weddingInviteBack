import { faker } from "@faker-js/faker";
import { DataTypes, Model } from "sequelize";
import { NEED_FORCE_SYNC, NEED_SEEDS } from "../configs/models.configs.js";

export const initGroupModel = async (sequelize, Wedding) => {
  class Group extends Model {}

  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      wedding_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Wedding,
          key: "id",
        },
      },
      is_confirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      message: {
        type: DataTypes.STRING(1024),
      },
    },
    { sequelize: sequelize }
  );

  await Group.sync({ force: NEED_FORCE_SYNC });

  if (!NEED_SEEDS) return;

  const seed = new Array(100).fill(1).map(() => ({
    wedding_id: faker.number.int({ min: 1, max: 100 }),
    is_confirm: faker.datatype.boolean(),
    message: faker.lorem.words(20),
  }));

  seed.forEach(async (s) => await Group.create(s));
};
