import { code } from "../statusCode.js";
import { ErrorBase } from "./ErrorBase.js";

class NotFoundError extends ErrorBase {
    constructor(
        message = "O recurso não foi encontrado.",
        statusCode = code.noContent,
    ) {
        super(message, statusCode);
    }
}

export { NotFoundError };
