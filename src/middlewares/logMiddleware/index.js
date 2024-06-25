/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
let count = 0;
export const loggerMiddleware = (error, req, res, next) => {
    if (error) {
        count += 1;
        console.error(`WL - ${count} - Erro capturado: ${error.message}`);
        // console.log({ error });
    }

    if (req) {
        count += 1;
        console.log(
            `WL - ${count} - Requisição recebida:  ${req.method} ${req.url}`,
        );
        // console.log({ req });
    }

    if (res.body || res.statusCode) {
        count += 1;
        console.log(
            `WL - ${count} - Response enviada: ${res.statusCode} | ${res.body}`,
        );
        // console.log({ res });
    }

    res.statusCode(200).send("MD");

    next(error, req, res);
};
