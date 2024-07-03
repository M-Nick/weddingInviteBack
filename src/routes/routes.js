import { initWeddingRoute } from "./admin/weddings.route.js";
import { initAdminRoute } from "./admin/admin.route.js";
import { initEventRoute } from "./admin/event.route.js";
import { initColorRoute } from "./admin/color.route.js";
import { initQuestionRoute } from "./admin/question.route.js";
import { initAnswerRoute } from "./admin/answer.route.js";
import { initGuestRoute } from "./admin/guest.route.js";
import { initGroupRoute } from "./admin/group.route.js";
import { initLandingRoute } from "./landing/landing.route.js";
import { initGroupAnswerRoute } from "./landing/groupAnswer.route.js";

export const initRoutes = async (app, models) => {
  app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
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
