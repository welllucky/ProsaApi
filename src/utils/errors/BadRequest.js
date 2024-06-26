import { code } from "../statusCode.js";
import { ErrorBase } from "./ErrorBase.js";

class BadRequest extends ErrorBase {
    constructor(
        message = "Houve um problema ao utilizar um dos parametros passado. Por favor, revise novamente e tente outra vez.",
    ) {
        super(message, code.badRequest);
    }
}

export { BadRequest };
