import { code } from "../statusCode.js";
import { ErrorBase } from "./ErrorBase.js";

class DBProblem extends ErrorBase {
    constructor(
        message = "Houve a tentativa de salvar o mesmo recurso mais de uma vez ao mesmo tempo. Por favor, tente novamente mais tarde.",
        statusCode = code.badRequest,
    ) {
        super(message, statusCode);
    }
}

export { DBProblem };
