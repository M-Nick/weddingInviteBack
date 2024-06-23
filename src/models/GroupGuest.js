import { Model } from "sequelize";

export const initGroupGuest = () => {
  class GroupGuest extends Model {}

  GroupGuest.sync();
};
