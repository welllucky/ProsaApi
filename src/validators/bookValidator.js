/* eslint-disable no-magic-numbers */
import { zId } from "@zodyac/zod-mongoose";
import { z } from "zod";

export const bookValidator = z.object({
    title: z.string().min(3).max(128),
    publisher: z.string().min(3).max(128),
    price: z.number().default(0).isOptional(),
    pages: z.number().min(1).default(1).isOptional(),
    author: zId.describe("ObjectId:Company").isOptional(),
});
