import { initAnswerModel } from "./Answer.model.js";
import { initColorModel } from "./Colors.model.js";
import { initEventModel } from "./Event.model.js";
import { initGroupModel } from "./Group.model.js";
import { initGroupAnswerModel } from "./GroupAnswer.model.js";
import { initGroupGuestModel } from "./GroupGuest.model.js";
import { initGuestModel } from "./Guest.model.js";
import { initPlaceModel } from "./Place.model.js";
import { initQuestionModel } from "./Question.model.js";
import { initWeddingModel } from "./Wedding.model.js";

export const initModels = async (sequelize) => {
  await initWeddingModel(sequelize);
  await initPlaceModel(sequelize);
  await initGuestModel(sequelize);
  await initColorModel(sequelize, sequelize.models.Wedding);
  await initGroupModel(sequelize, sequelize.models.Wedding);
  await initQuestionModel(sequelize, sequelize.models.Wedding);
  await initAnswerModel(sequelize, sequelize.models.Question);
  await initEventModel(
    sequelize,
    sequelize.models.Wedding,
    sequelize.models.Place
  );
  await initGroupGuestModel(
    sequelize,
    sequelize.models.Group,
    sequelize.models.Guest
  );
  await initGroupAnswerModel(
    sequelize,
    sequelize.models.Group,
    sequelize.models.Answer
  );
};
