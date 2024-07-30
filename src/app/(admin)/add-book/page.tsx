'use client'
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { bookSchema } from "@/schemas/addBookSchema";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bindings, boards, categories, exams, languages, levels, sizes, subjects } from '@/model/Enums';
import { useAppDispatch } from "@/lib/hooks";
import { setBooks } from "@/lib/slices/booksSlice";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getBooks } from "@/app/apiCalls/callBooks";
  


function AddBookForm() {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            image: '',
            authors: [{name: ''}],
            price: NaN,
            discount: NaN,
            level: '',
            subject: '',
            board: '',
            exam: '',
            keywords: [undefined],
            language: '',
            isbn: '',
            number_of_pages: NaN,
            year: NaN,
            size: '',
            binding: '',
            category: ''
        }
    });

    const onSubmit = async (data: z.infer<typeof bookSchema>) => {
        setIsSubmitting(true);
        try{
            const response = await axios.post('/api/add-book', data);
            if(response.status === 200) {
                toast({
                    title: "Book added",
                    description: "Book successfully added to database",
                    variant: "default"
                });

                const allBooks = await getBooks();
                if (Array.isArray(allBooks)) {
                    dispatch(setBooks(allBooks))
                } else {
                    console.error("Data fetched is not an array:", allBooks);
                }
                
                router.push('/');
            } else {
                toast({
                    title: "Error Occured",
                    description: "There might be some issue with the data provided",
                    variant: "destructive"
                });
                
                router.push('/');
            }
        } catch(error: any) {
            toast({
                title: "Error Occured",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
        
    }

    return (
        <div className="flex justify-center items-center min-h-screen mt-32 mb-24">
            <div className="w-full max-w-5xl p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome to StudyMaxx
                    </h1>
                    <p className="mb-4">
                        Please add a book
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title.." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        <FormField 
                            name="image"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="url" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                        name="authors"
                        control={form.control}
                        render={({ field }) => (
                            <>{
                                field.value.map((author, index) => (
                                    <div key={`author_${index}`}>
                                        <FormItem >
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input placeholder="author name" value={author.name}
                                                    onChange={(e) => {
                                                    const newAuthors = [...field.value];
                                                    newAuthors[index].name = e.target.value;
                                                    field.onChange(newAuthors);
                                                    }} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                ))}
                                <Button type="button" onClick={() => field.onChange([...field.value, {name: ''}])}>Add Another Author</Button>
                            </>
                        )}
                        />

                        <FormField 
                            name="price"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="price" type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} onWheel={(e) => (e.target as HTMLElement).blur()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                            name="discount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="discount amount in percentage (%)" type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} onWheel={(e) => (e.target as HTMLElement).blur()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        
                        <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Class</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a class" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {levels.map((level, index) => {
                                    
                                    return <SelectItem key={`level_${index}`} value={level}>
                                        {level}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {subjects.map((subject, index) => {
                                    

                                    return <SelectItem key={`level_${index}`} value={subject}>
                                        {subject}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="board"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Board</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a board" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {boards.map((board, index) => {
                                    
                                    return <SelectItem key={`level_${index}`} value={board}>
                                        {board}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="exam"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Exam</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an exam" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {exams.map((exam, index) => {
                                   
                                    return <SelectItem key={`level_${index}`} value={exam}>
                                        {exam}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField 
                        name="keywords"
                        control={form.control}
                        render={({ field }) => (
                            <>{
                                field.value.map((keyword, index) => (
                                    <div key={`keyword_${index}`}>
                                        <FormItem >
                                            <FormLabel>Keyword</FormLabel>
                                            <FormControl>
                                                <Input placeholder="keyword" value={keyword}
                                                    onChange={(e) => {
                                                    const newKeywords = [...field.value];
                                                    newKeywords[index] = e.target.value;
                                                    field.onChange(newKeywords);
                                                    }} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                ))}
                                <Button type="button" onClick={() => field.onChange([...field.value, ''])}>Add Another Keyword</Button>
                            </>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {languages.map((language, index) => {
                                    if(language === "") return null; 
                                    return <SelectItem key={`language_${index}`} value={language}>
                                        {language}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField 
                            name="isbn"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ISBN</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ISBN.." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                            name="number_of_pages"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pages</FormLabel>
                                    <FormControl>
                                        <Input placeholder="number of pages" type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} onWheel={(e) => (e.target as HTMLElement).blur()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                            name="year"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                        <Input placeholder="year" type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} onWheel={(e) => (e.target as HTMLElement).blur()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField
                        control={form.control}
                        name="size"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a size" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {sizes.map((size, index) => {
                                    if(size === "") return null;

                                    return <SelectItem key={`size_${index}`} value={size}>
                                        {size}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="binding"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Binding</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a binding" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {bindings.map((binding, index) => {
                                    if(binding === "") return null;
                                    return <SelectItem key={`binding_${index}`} value={binding}>
                                        {binding}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {categories.map((category, index) => {
                                    if(category === "") return null;
                                    return <SelectItem key={`category_${index}`} value={category}>
                                        {category}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <div className="flex justify-center items-center">
                            <Button type="submit" disabled={isSubmitting}>
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Add Book')
                                }
                            </Button>
                        </div>
                        
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        <Link href="/" className="text-blue-600 hover:text-blue-800">Visit Home?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AddBookForm;
