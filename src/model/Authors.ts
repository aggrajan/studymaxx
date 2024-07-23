import { Schema, Document } from "mongoose";

export interface Author {
    name: string;
}

const AuthorSchema: Schema<Author> = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    }
})

export default AuthorSchema;