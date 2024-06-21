import { Schema, Types, model } from "mongoose";

const AuthorSchema = new Schema(
    {
        id: { type: Types.ObjectId },
        name: { type: String, required: true },
        age: { type: Number },
        nationality: { type: String },
    },
    { versionKey: false },
);

const author = model("Authors", AuthorSchema);

export { AuthorSchema, author };
