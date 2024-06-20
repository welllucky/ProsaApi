import { Schema, Types, model } from "mongoose";
import { AuthorSchema } from "./AuthorModel.js";

const BookSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    title: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
    },
    page: {
      type: Number,
    },
    author: AuthorSchema,
  },
  {
    versionKey: false,
  }
);

const book = model("Books", BookSchema);

export { BookSchema, book };
