const initWeddingRoute = require("./admin/weddings.route.js").initWeddingRoute;
const initAdminRoute = require("./admin/admin.route.js").initAdminRoute;
const initEventRoute = require("./admin/event.route.js").initEventRoute;
const initColorRoute = require("./admin/color.route.js").initColorRoute;
const initQuestionRoute =
  require("./admin/question.route.js").initQuestionRoute;
const initAnswerRoute = require("./admin/answer.route.js").initAnswerRoute;
const initGuestRoute = require("./admin/guest.route.js").initGuestRoute;
const initGroupRoute = require("./admin/group.route.js").initGroupRoute;
const initLandingRoute = require("./landing/landing.route.js").initLandingRoute;
const initGroupAnswerRoute =
  require("./landing/groupAnswer.route.js").initGroupAnswerRoute;

exports.initRoutes = async (app, models) => {
  app.get("/api/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API on /api/" });
  });

  app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API on /" });
  });

  await initWeddingRoute(app, models.Wedding).then(() =>
    console.log("WeddingRoutes were initialized")
  );
  await initAdminRoute(app, models).then(() =>
    console.log("AdminRoutes were initialized")
  );
  await initEventRoute(app, models.Event).then(() =>
    console.log("EventRoutes were initialized")
  );
  await initColorRoute(app, models.Color).then(() =>
    console.log("ColorRoutes were initialized")
  );
  await initQuestionRoute(
    app,
    models.Question,
    models.Answer,
    models.GroupAnswer
  ).then(() => console.log("QuestionRoutes were initialized"));
  await initAnswerRoute(app, models.Answer, models.GroupAnswer).then(() =>
    console.log("AnswerRoutes were initialized")
  );
  await initGuestRoute(app, models.Guest).then(() =>
    console.log("GuestRoutes were initialized")
  );
  await initGroupRoute(
    app,
    models.Group,
    models.Guest,
    models.GroupAnswer
  ).then(() => console.log("GroupRoutes were initialized"));
  await initLandingRoute(app, models).then(() =>
    console.log("GroupRoutes were initialized")
  );
  await initGroupAnswerRoute(app, models.GroupAnswer).then(() =>
    console.log("GroupAnswerRoutes were initialized")
  );
};
