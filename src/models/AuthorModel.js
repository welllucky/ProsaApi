import { Schema, Types, model } from "mongoose";

const AuthorSchema = new Schema(
    {
        id: { type: Types.ObjectId, required: false },
        name: {
            type: String,
            required: [true, "O nome do(a) autor(a) é obrigatório."],
        },
        nationality: { type: String, required: false },
        age: {
            type: Number,
            required: false,
            // eslint-disable-next-line no-magic-numbers
            min: [15, "A idade do(a) Autor(a) deve ser maior que 15"],
        },
    },
    { versionKey: false },
);

const author = model("Authors", AuthorSchema);

export { AuthorSchema, author };
