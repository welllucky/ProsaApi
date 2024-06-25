import { Schema, Types, model } from "mongoose";

const AuthorSchema = new Schema(
    {
        id: { type: Types.ObjectId, required: false },
        name: {
            type: String,
            required: [true, "O nome do(a) autor(a) é obrigatório."],
        },
        nationality: { type: String, required: false },
        age: { type: Number, required: false },
    },
    { versionKey: false },
);

const author = model("Authors", AuthorSchema);

export { AuthorSchema, author };
