import { code } from "../statusCode.js";
import { ErrorBase } from "./ErrorBase.js";

class ResourceNotFound extends ErrorBase {
    constructor() {
        super("O recurso não foi encontrado.", code.noContent);
    }
}

export { ResourceNotFound };
