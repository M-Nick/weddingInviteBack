const initAnswerModel = require("./Answer.model.js").initAnswerModel;
const initColorModel = require("./Colors.model.js").initColorModel;
const initEventModel = require("./Event.model.js").initEventModel;
const initGroupModel = require("./Group.model.js").initGroupModel;
const initGroupAnswerModel =
  require("./GroupAnswer.model.js").initGroupAnswerModel;
const initGuestModel = require("./Guest.model.js").initGuestModel;
const initQuestionModel = require("./Question.model.js").initQuestionModel;
const initWeddingModel = require("./Wedding.model.js").initWeddingModel;

exports.initModels = async (sequelize) => {
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
