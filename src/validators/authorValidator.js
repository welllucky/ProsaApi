/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
import { zId } from "@zodyac/zod-mongoose";
import { z } from "zod";

export const authorValidator = z.object({
    age: z
        .number({
            message: "A idade deve ser passada como um número",
        })
        .min(15, {
            message: "A idade do(a) Autor(a) deve ser maior que 14",
        })
        .optional(),
    name: z
        .string({
            message: "O nome deve ser passado por texto 2",
            required_error: "O nome é obrigatório",
            invalid_type_error: "O nome deve ser passado por texto",
        })
        .min(3, {
            message: "O tamanho do nome deve ser maior que 2 caracteres",
        })
        .max(128, {
            message: "O tamanho do nome deve ser menor que 129 caracteres",
        }),
    nationality: z
        .string({
            message: "A nacionalidade deve ser passada como um texto",
        })
        .min(4, {
            message:
                "O tamanho do nome da nacionalidade deve ser maior que 3 caracteres",
        })
        .max(128, {
            message:
                "O tamanho do nome da nacionalidade deve ser menor que 129 caracteres",
        })
        .optional(),
    id: zId.optional(),
});
