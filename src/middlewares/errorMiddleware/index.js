/* eslint-disable max-statements */
import { Error } from "mongoose";
import { ZodError } from "zod";
import {
    DBProblem,
    ErrorBase,
    NotFoundError,
    PropertyError,
    ResourceNotFound,
} from "../../utils/errors/index.js";

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (error, req, res, next) => {
    if (error instanceof Error.CastError) {
        new PropertyError(error.path, error.value).send(res);
        return;
    }

    if (
        error instanceof Error.StrictModeError ||
        error instanceof Error.ValidationError
    ) {
        // eslint-disable-next-line no-console
        console.log("Caiu em StrictModeError & ValidationError");
        new PropertyError(error).send(res);
        return;
    }

    if (error instanceof Error.DocumentNotFoundError) {
        new ResourceNotFound().send(res);
        return;
    }

    if (error instanceof Error.ParallelSaveError) {
        new DBProblem().send(res);
        return;
    }

    if (error instanceof Error.StrictPopulateError) {
        new DBProblem(
            "Houve um problema ao buscar todos os dados necessários. Por favor, tente novamente mais tarde.",
        ).send(res);

        return;
    }

    if (error instanceof Error.MongooseServerSelectionError) {
        new DBProblem(
            "Estamos tendo problema para conectar com a base de dados. Por favor, tente novamente mais tarde.",
        ).send(res);

        return;
    }

    if (error instanceof ZodError) {
        const params = [];
        const errors = error.issues.map((issue) => issue.message);

        error.issues.map((issue) =>
            issue.path.map((param) => params.push(param)),
        );

        new PropertyError(params, errors).send(res);

        return;
    }

    if (error instanceof NotFoundError) {
        error.send(res);
        return;
    }

    new ErrorBase().send(res);
};
