import { Schema, Types, model } from "mongoose";
import { AuthorSchema } from "./AuthorModel.js";

const modelName = "Books";

const BookSchema = new Schema(
    {
        id: { type: Types.ObjectId },
        title: {
            type: String,
            required: [true, "O nome do livro é obrigatório."],
        },
        publisher: {
            type: String,
            default: "Independente",
        },
        price: {
            type: Number,
            default: 0,
        },
        page: {
            type: Number,
            default: 1,
        },
        author: AuthorSchema,
    },
    {
        versionKey: false,
        statics: {
            findByName(name) {
                return this.find({ name: new RegExp(name, "iu") });
            },
        },
        // Methods: {
        //     Exists() {
        //         Const bookSearchedByTitle = model(modelName).find({
        //             Title: this.title,
        //         });
        //         Const bookSearchedById = model(modelName).findById(this.id);

        //         Return Boolean(bookSearchedByTitle || bookSearchedById);
        //     },
        // },
    },
);

const book = model(modelName, BookSchema);

export { BookSchema, book };
