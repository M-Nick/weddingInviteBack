import { initAnswerModel } from "./Answer.model.js";
import { initColorModel } from "./Colors.model.js";
import { initEventModel } from "./Event.model.js";
import { initGroupModel } from "./Group.model.js";
import { initGroupAnswerModel } from "./GroupAnswer.model.js";
import { initGuestModel } from "./Guest.model.js";
import { initQuestionModel } from "./Question.model.js";
import { initWeddingModel } from "./Wedding.model.js";

export const initModels = async (sequelize) => {
  await initWeddingModel(sequelize);
  await initColorModel(sequelize, sequelize.models.Wedding);
  await initGroupModel(sequelize, sequelize.models.Wedding);
  await initQuestionModel(sequelize, sequelize.models.Wedding);
  await initGuestModel(sequelize, sequelize.models.Group);
  await initAnswerModel(sequelize, sequelize.models.Question);
  await initEventModel(
    sequelize,
    sequelize.models.Wedding,
    sequelize.models.Location
  );
  await initGroupAnswerModel(
    sequelize,
    sequelize.models.Group,
    sequelize.models.Answer
  );
};
