import { model, Schema } from "mongoose";

export const User = model("user", new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    senha: {
        type: String,
        required: true
    }
}));
