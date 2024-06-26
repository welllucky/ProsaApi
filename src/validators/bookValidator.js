/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
import { zId } from "@zodyac/zod-mongoose";
import { z } from "zod";

export const bookValidator = z.object({
    title: z
        .string({
            required_error: "O título do livro é obrigatório",
            invalid_type_error: "O título deve ser passado por texto",
        })
        .min(3, {
            message:
                "O tamanho do título do livro deve ser maior que 2 caracteres",
        })
        .max(128, {
            message:
                "O tamanho  título do livro deve ser menor que 129 caracteres",
        }),
    publisher: z
        .string({
            invalid_type_error: "O nome da editora deve ser passado por texto",
        })
        .min(3, {
            message:
                "O tamanho do título do livro deve ser maior que 2 caracteres",
        })
        .max(128, {
            message:
                "O tamanho  título do livro deve ser menor que 129 caracteres",
        }),
    price: z
        .number({
            invalid_type_error:
                "O preço do livro deve ser passado como um número",
        })
        .default(0)
        .isOptional(),
    pages: z
        .number({
            invalid_type_error:
                "A quantidade de páginas do livro deve ser passado como um número",
        })
        .min(10, {
            message: "O livro deve ter no mínimo 10 páginas",
        })
        .isOptional(),
    author: zId.describe("ObjectId:Company").isOptional(),
});
