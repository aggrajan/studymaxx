import mongoose, { Schema, Document } from "mongoose";
import { bindings, boards, categories, exams, languages, levels, sizes, subjects } from "./Enums";
import AuthorSchema, { Author } from "./Authors";

const boardsWithEmpty: [string, ...string[]] = ['' as const, ...boards];
const examsWithEmpty: [string, ...string[]] = ['' as const, ...exams];
const subjectsWithEmpty: [string, ...string[]] = ['' as const, ...subjects];
const levelsWithEmpty: [string, ...string[]] = ['' as const, ...levels];

export interface Book extends Document {
    title: string;
    image: string;
    authors?: Author[];
    price: number;
    discount?: number;
    level?: string;
    subject?: string;
    board?: string;
    exam?: string;
    keywords: string[];
    language: string;
    isbn: string;
    number_of_pages: number;
    year: number;
    size: string;
    binding: string;
    category: string;
    about: string[];
    salient_features: string[];
    useful_for: string[];
    additional_support?: string[] | undefined;
    latest: boolean;
    pdfUrl?: string;
    outOfStock: boolean;
    previewImages: string[];
}

export const BookSchema: Schema<Book> = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    image: {
        type: String,
        required: [true, "image url is required"]
    },
    authors: [AuthorSchema],
    price: {
        type: Number,
        min: 0,
        required: [true, "Price is required"]
    },
    discount: {
        type: Number,
        min: 0,
        required: false
    },
    level: {
        type: String,
        required: false,
        enum: levelsWithEmpty
    },
    subject: {
        type: String,
        required: false,
        enum: subjectsWithEmpty
    },
    board: {
        type: String,
        required: false,
        enum: boardsWithEmpty
    },
    exam: {
        type: String,
        required: false,
        enum: examsWithEmpty
    },
    keywords: [{
        type: String,
        required: [true, "Keyword is required"]
    }],
    language: {
        type: String,
        required: [true, 'Language is required'],
        enum: languages
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required']
    },
    number_of_pages: {
        type: Number,
        required: [true, "Number of Pages is required"],
        min: 0
    },
    year: {
        type: Number,
        required: [true, "Year is required"]
    },
    size: {
        type: String,
        required: [true, "Size is required"],
        enum: sizes
    },
    binding: {
        type: String,
        required: [true, "Binding Type is required"],
        enum: bindings
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: categories
    },
    about: [{
        type: String,
        required: [true, "'About the Book' field is required"]
    }],
    salient_features: [{
        type: String,
        required: [true, "'Salient Features' field is required"]
    }],
    useful_for: [{
        type: String,
        required: [true, "'Useful For' field is required"]
    }],
    additional_support: {
        type: [String],
        required: false,
        default: [],
    },
    latest: {
        type: Boolean,
        required: [true, "latest field is required"],
        default: false
    }, 
    pdfUrl: {
        type: String,
        required: false
    },
    outOfStock: {
        type: Boolean,
        required: true,
        default: false
    },
    previewImages: [{
        type: String,
        required: [true, "Preview Image is required"]
    }]
});

const BooksModel = (mongoose.models.Book as mongoose.Model<Book>) || mongoose.model<Book>("Book", BookSchema)

export default BooksModel;