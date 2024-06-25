import { code } from "../statusCode.js";
import { ErrorBase } from "./ErrorBase.js";

class BadRequest extends ErrorBase {
    constructor(message) {
        super(
            message ||
                "Houve um problema ao utilizar um dos parametros passado. Por favor, revise novamente e tente outra vez.",
            code.badRequest,
        );
    }
}

export { BadRequest };
