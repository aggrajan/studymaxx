'use client'
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { bindings, boards, categories, exams, languages, levels, sizes, subjects } from '@/model/Enums';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setBooks } from "@/lib/slices/booksSlice";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Book } from "@/model/Books";
import { editBookSchema } from "@/schemas/editBookSchema";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { getBooks } from "@/app/apiCalls/callBooks";
import { setStoreBooks } from "@/lib/slices/bookStoreSlice";
import { setAuthState } from "@/lib/slices/authSlice";
import { getProfile } from "@/app/apiCalls/callProfile";
import { removeCartItem, updateCartItem } from "@/lib/slices/cartSlice";  


function AddBookForm() {
    const dispatch = useAppDispatch();
    const { books } = useAppSelector((state) => state.books)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams<{bookId: string}>();
    const bookId = params.bookId;
    const book: Book = books.filter((book: Book) => book._id === bookId)[0];

    function convertDriveLink(url: string): string {
        const regex = /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?(view\?(usp=sharing|usp=drive_link)|view)?$/;
        const match = url.match(regex);

        if (match && match[1]) {
            const fileId = match[1];
            return `https://drive.google.com/thumbnail?id=${fileId}`;
        }
    
        return url;
    }

    function convertPDFLink(url: string): string {
        const regex = /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?(view\?(usp=sharing|usp=drive_link)|view)?$/;
        const match = url.match(regex);

        if (match && match[1]) {
            const fileId = match[1];
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
    
        return url;
    }

    const form = useForm<z.infer<typeof editBookSchema>>({
        resolver: zodResolver(editBookSchema),
        defaultValues: book ? {
            id: bookId,
            title: book.title,
            image: book.image,
            authors: book.authors,
            price: book.price,
            discount: book.discount,
            level: book.level,
            subject: book.subject,
            board: book.board,
            exam: book.exam,
            keywords: book.keywords,
            language: book.language,
            isbn: book.isbn,
            number_of_pages: book.number_of_pages,
            year: book.year,
            size: book.size,
            binding: book.binding,
            category: book.category,
            about: book.about,
            salient_features: book.salient_features,
            useful_for: book.useful_for,
            additional_support: book.additional_support,
            pdfUrl: book.pdfUrl,
            latest: (book.latest !== undefined) ? book.latest : false
        } : {
            id: bookId,
            title: "",
            image: "",
            authors: [{name: ""}],
            price: undefined,
            discount: undefined,
            level: "",
            subject: "",
            board: "",
            exam: "",
            keywords: [""],
            language: "",
            isbn: "",
            number_of_pages: undefined,
            year: undefined,
            size: "",
            binding: "",
            category: "",
            about: [""],
            salient_features: [""],
            useful_for: [""],
            additional_support: [""],
            pdfUrl: "",
            latest: false
        }
    });

    const onSubmit = async (data: z.infer<typeof editBookSchema>) => {
        setIsSubmitting(true);
        try {
            data.image = convertDriveLink(data.image);
            data.pdfUrl = convertPDFLink(data.pdfUrl);
            const updatedBook: any = {
                ...book,
                title: data.title,
                image: data.image,
                authors: data.authors,
                price: data.price,
                discount: data.discount,
                level: data.level,
                subject: data.subject,
                board: data.board,
                exam: data.exam,
                keywords: data.keywords,
                language: data.language,
                isbn: data.isbn,
                number_of_pages: data.number_of_pages,
                year: data.year,
                size: data.size,
                binding: data.binding,
                category: data.category,
                about: data.about,
                salient_features: data.salient_features,
                useful_for: data.useful_for,
                additional_support: data.additional_support,
                pdfUrl: data.pdfUrl,
                latest: data.latest
            };
            dispatch(updateCartItem({ book: updatedBook as Book }));
            const response = await axios.post('/api/edit-book', data);
            if(response.status === 200) {
                await axios.post(`/api/refresh-cart`, { bookId: bookId });
                await axios.post(`/api/refresh-wishlist`, { bookId: bookId });
                toast({
                    title: "Book edited",
                    description: "Book successfully edited in the database",
                    variant: "default"
                });

                const allBooks = await getBooks();
                const currentUser = await getProfile();
                if (Array.isArray(allBooks)) {
                    dispatch(setBooks(allBooks));
                    dispatch(setStoreBooks(allBooks));
                    dispatch(setAuthState(currentUser));
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

    const onDelete = async () => {
        setIsSubmitting(true);
        try {
            
            dispatch(removeCartItem({ id: (book._id as number) }));
            
            const response = await axios.post('/api/delete-book', { id: bookId });
            if(response.status === 200) {
                form.reset();
                
                toast({
                    title: "Book deleted",
                    description: "Book successfully deleted in the database",
                    variant: "default"
                });

                const allBooks = await getBooks();
                const currentUser = await getProfile();
                if (Array.isArray(allBooks)) {
                    dispatch(setBooks(allBooks));
                    dispatch(setStoreBooks(allBooks));
                    dispatch(setAuthState(currentUser));
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
        } catch (error: any) {
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
                        Please edit this book
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
                            name="pdfUrl"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pdf URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="url" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                            name="latest"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lastest</FormLabel>
                                    <FormControl>
                                        <div>
                                        <Checkbox id="latest"
                                            checked={field.value}
                                            onClick={() => field.onChange(!field.value)}
                                        />
                                        <label
                                            htmlFor="latest"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-3"
                                        >
                                            Latest Book
                                        </label>
                                        </div>
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
                                    <div key={`author_${index}`} className="flex flex-row w-full space-x-2">
                                        <FormItem className="flex-1">
                                            <FormLabel>Author</FormLabel>
                                            <FormControl>
                                                <Input placeholder="author name" value={author.name}
                                                    className="w-full"
                                                    onChange={(e: any) => {
                                                    const newAuthors = [...field.value];
                                                    newAuthors[index].name = e.target.value;
                                                    field.onChange(newAuthors);
                                                    }} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        <img src="/minus.svg" className="w-5 h-5 self-center cursor-pointer" onClick={(e: any) => {
                                            const newAuthors = [...field.value];
                                            newAuthors.splice(index, 1);
                                            field.onChange(newAuthors);
                                        }}></img>
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
                                    <div key={`keyword_${index}`} className="flex flex-row w-full space-x-2">
                                        <FormItem className="flex-1">
                                            <FormLabel>Keyword</FormLabel>
                                            <FormControl>
                                                <Input placeholder="keyword" value={keyword}
                                                    className="w-full"
                                                    onChange={(e) => {
                                                    const newKeywords = [...field.value];
                                                    newKeywords[index] = e.target.value;
                                                    field.onChange(newKeywords);
                                                    }} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        <img src="/minus.svg" className="w-5 h-5 self-center cursor-pointer" onClick={(e: any) => {
                                            const newKeywords = [...field.value];
                                            newKeywords.splice(index, 1);
                                            field.onChange(newKeywords);
                                        }}></img>
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

                        <div><FormField 
                            name="about"
                            control={form.control}
                            render={({ field }) => (
                                <>{field.value.map((aboutBook, index) => (
                                    <div key={`About_${index}`} className="flex flex-row w-full space-x-2">
                                    <FormItem className="flex-1">
                                        <FormLabel>About the Book</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="About.." className="w-full" value={aboutBook} onChange={(e: any) => {
                     
                                                const abouts = [...field.value];
                                                abouts[index] = e.target.value;
                                                field.onChange(abouts);
                                            }}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <img src="/minus.svg" className="w-5 h-5 self-center cursor-pointer"  onClick={(e: any) => {
                                            const abouts = [...field.value];
                                            abouts.splice(index, 1);
                                            field.onChange(abouts);
                                        }}></img>
                                </div>
                                ))}
                                <Button type="button" className="mt-4" onClick={() => field.onChange([...field.value, ''])}>Add Another About Section</Button>
                                </>
                            )}      
                        /></div>

                        <div><FormField 
                            name="salient_features"
                            control={form.control}
                            render={({ field }) => (
                                <>{field.value.map((feature, index) => (
                                    <div key={`Feature_${index}`} className="flex flex-row w-full space-x-2">
                                    <FormItem className="flex-1">
                                        <FormLabel>Salient Features</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Feature.."
                                                className="w-full" value={feature} onChange={(e: any) => {
                                                e.preventDefault(); 
                                                const features = [...field.value];
                                                features[index] = e.target.value;
                                                field.onChange(features);
                                            }}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <img src="/minus.svg" className="w-5 h-5 self-center cursor-pointer" onClick={(e: any) => {
                                            const features = [...field.value];
                                            features.splice(index, 1);
                                            field.onChange(features);
                                        }}></img>
                                </div>
                                ))}
                                <Button type="button" className="mt-4" onClick={() => field.onChange([...field.value, ''])}>Add Another Salient Feature Section</Button>
                                </>
                            )}      
                        /></div>

                        <div><FormField 
                            name="useful_for"
                            control={form.control}
                            render={({ field }) => (
                                <>{field.value.map((useful, index) => (
                                    <div key={`Useful_${index}`} className="flex flex-row space-x-2 w-full">
                                    <FormItem className="flex-1">
                                        <FormLabel>Useful For</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Useful for.." 
                                                className="w-full" value={useful} onChange={(e: any) => {
                                                e.preventDefault(); 
                                                const usefulFor = [...field.value];
                                                usefulFor[index] = e.target.value;
                                                field.onChange(usefulFor);
                                            }}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <img src="/minus.svg" className="w-5 h-5 self-center cursor-pointer" onClick={(e: any) => {
                                            const usefulFor = [...field.value];
                                            usefulFor.splice(index, 1);
                                            field.onChange(usefulFor);
                                        }}></img>
                                </div>
                                ))}
                                <Button type="button" className="mt-4" onClick={() => field.onChange([...field.value, ''])}>Add Another Useful For Section</Button>
                                </>
                            )}      
                        /></div>

                        <div><FormField 
                            name="additional_support"
                            control={form.control}
                            render={({ field }) => (
                                <>{field.value.map((additional, index) => (
                                    <div key={`Additional_${index}`} className="flex flex-row space-x-2 w-full">
                                    <FormItem className="flex-1">
                                        <FormLabel>Additional Support</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="additional support.." 
                                                className="w-full" value={additional} onChange={(e: any) => {
                                                e.preventDefault(); 
                                                const additionalSupport = [...field.value];
                                                additionalSupport[index] = e.target.value;
                                                field.onChange(additionalSupport);
                                            }}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <img src="/minus.svg" className="w-5 h-5 cursor-pointer self-center" onClick={(e: any) => {
                                            const additionalSupport = [...field.value];
                                            additionalSupport.splice(index, 1);
                                            field.onChange(additionalSupport);
                                        }}></img>
                                </div>
                                ))}
                                <Button type="button" className="mt-4" onClick={() => field.onChange([...field.value, ''])}>Add Another Additional Support Section</Button>
                                </>
                            )}      
                        /></div>

                        <div className="flex justify-center items-center gap-8">
                            <Button type="submit" disabled={isSubmitting}>
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Edit Book')
                                }
                            </Button>
                            <Button type="button" disabled={isSubmitting} className="bg-red-600 hover:bg-red-400" onClick={onDelete}>
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Delete Book')
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
