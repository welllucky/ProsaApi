/* eslint-disable no-magic-numbers */
import { zId } from "@zodyac/zod-mongoose";
import { z } from "zod";

export const authorValidator = z.object({
    age: z.number().min(14).max(150).default(0).optional(),
    name: z.string().min(3).min(128),
    nationality: z.string().min(4).max(128).optional(),
    id: zId.optional(),
});
