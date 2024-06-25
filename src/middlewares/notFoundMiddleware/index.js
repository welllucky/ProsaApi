import { NotFoundError } from "../../utils/errors/index.js";
import { code } from "../../utils/statusCode.js";

// eslint-disable-next-line no-unused-vars
export const notFoundMiddleware = (req, res, next) => {
    const notFoundResponse = new NotFoundError(
        `O endpoint ${req.url} não existe.`,
        code.notFound,
    );
    next(notFoundResponse);
};
