import {z} from 'zod';
import { bindings, boards, categories, exams, languages, levels, sizes, subjects } from '../model/Enums';

const boardsWithEmpty: [string, ...string[]] = ['' as const, ...boards];
const examsWithEmpty: [string, ...string[]] = ['' as const, ...exams];
const subjectsWithEmpty: [string, ...string[]] = ['' as const, ...subjects];
const levelsWithEmpty: [string, ...string[]] = ['' as const, ...levels];



export const authorSchema = z.object({
    name: z.string()
            .min(1, "author name must contain atleast 1 character")
})

export const editBookSchema = z.object({
    id: z.string().min(1, "id is required"),
    title: z.string().min(1, "Title is required"),
    image: z.string().url({ message: "Invalid url" }),
    authors: z.array(authorSchema),
    price: z.number().min(0, { message: "Price must be at least 0" }), 
    discount: z.number().min(0).optional(),
    level: z.enum(levelsWithEmpty).optional(),
    subject: z.enum(subjectsWithEmpty).optional(),
    board: z.enum(boardsWithEmpty).optional(),
    exam: z.enum(examsWithEmpty).optional(),
    keywords: z.array(z.string({ required_error: "Keyword is required" })).nonempty(),
    language: z.enum(languages, { required_error: "Language is required" }),
    isbn: z.string().min(1),
    number_of_pages: z.number().min(0, { message: "Number of Pages must be at least 0" }),
    year: z.number(),
    size: z.enum(sizes, { required_error: "Size is required" }),
    binding: z.enum(bindings, { required_error: "Binding Type is required" }),
    category: z.enum(categories, { required_error: "Category is required" }),
    about: z.array(z.string().min(1, "about section is required")).nonempty(),
    salient_features: z.array(z.string().min(1, "salient_features is required")).nonempty(),
    useful_for: z.array(z.string().min(1, "useful_for is required")).nonempty(),
    additional_support: z.array(z.string()).optional().default([]),
    pdfUrl: z.string().optional().refine(val => val === undefined || val === '' || z.string().url().safeParse(val).success, {
        message: "Invalid url"
    }),
    latest: z.boolean(),
    outOfStock: z.boolean(),
    previewImages: z.array(z.string())
                      .refine(arr => arr.length === 0 || arr.every(str => str.length > 0), {
                          message: "All Preview Images must be non-empty strings if provided"
                      })
})