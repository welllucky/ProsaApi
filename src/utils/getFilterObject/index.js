/* eslint-disable no-nested-ternary */
/* eslint-disable no-negated-condition */
export const getFilterObject = (model, validator, params) => {
    let terms = {};

    if (!validator || !model || !params)
        throw new Error(
            `É necessário passar ${
                !model ? "um modelo"
                : !validator ? "um validador"
                : "parâmetros"
            } como propriedade da função getFilterObject`,
        );

    if (model === "book")
        terms = {
            ...(params.title && {
                title: new RegExp(
                    validator.shape.title.parse(params.title),
                    "iu",
                ),
            }),
            ...(params.publisher && {
                publisher: validator.shape.publisher.parse(params.publisher),
            }),

            ...(params.page && {
                page: validator.shape.page.parse(params.page),
            }),

            ...((params.minPages || params.maxPages) &&
                !params.page && {
                    page: {
                        ...(params.maxPages && {
                            $gte: params.minPages || params.maxPages,
                        }),
                        ...(params.minPages && {
                            $lte: params.maxPages || params.minPages,
                        }),
                    },
                }),
        };

    return terms;
};
