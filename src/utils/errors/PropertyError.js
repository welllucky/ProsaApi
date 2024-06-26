import { code } from "../statusCode.js";
import { ErrorBase } from "./ErrorBase.js";

class PropertyError extends ErrorBase {
    constructor(
        paths = [],
        params = [],
        message = "Um ou mais parâmentros passados estam incorretos, tente novamente.",
    ) {
        super(message, code.badRequest, {
            params: paths,
            value: params,
        });
    }
}

export { PropertyError };
