import { code } from "../utils/statusCode.js";
import AuthorRoutes from "./AuthorRouter.js";
import BookRoutes from "./BookRouter.js";

const routes = (app) => {
    app.route("/").get((req, res) =>
        res.status(code.responseSuccessfully).send("WellluckY Server Started!"),
    );

    app.use(BookRoutes, AuthorRoutes);
};

export default routes;
