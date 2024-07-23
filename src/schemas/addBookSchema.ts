import {z} from 'zod';
import { bindings, boards, categories, exams, languages, levels, sizes, subjects } from '../model/Enums';

const boardsWithEmpty: [string, ...string[]] = ['' as const, ...boards];
const examsWithEmpty: [string, ...string[]] = ['' as const, ...exams];

export const authorSchema = z.object({
    name: z.string()
            .min(1, "author name must contain atleast 1 character")
})

export const bookSchema = z.object({
    title: z.string(),
    image: z.string(),
    authors: z.array(authorSchema),
    price: z.number().min(0, { message: "Price must be at least 0" }),
    discountedPrice: z.number().min(0).optional(),
    level: z.enum(levels, { required_error: "Class/Level is required" }),
    subject: z.enum(subjects, { required_error: "Subject is required" }),
    board: z.enum(boardsWithEmpty).optional(),
    exam: z.enum(examsWithEmpty).optional(),
    keywords: z.array(z.string()),
    language: z.enum(languages, { required_error: "Language is required" }),
    isbn: z.string(),
    number_of_pages: z.number().min(0, { message: "Number of Pages must be at least 0" }),
    year: z.number(),
    size: z.enum(sizes, { required_error: "Size is required" }),
    binding: z.enum(bindings, { required_error: "Binding Type is required" }),
    category: z.enum(categories, { required_error: "Category is required" })
})