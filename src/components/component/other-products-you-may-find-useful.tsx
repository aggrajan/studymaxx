"use client"
import { useEffect, useState } from "react";
import { ItemCard } from "./item-card";
import { Book } from "@/model/Books";
import { useAppSelector } from "@/lib/hooks";

export function OtherProductsYouMayFindUseful({ book, isModal }: { book: Book, isModal: boolean }) {
    const [books, setAllBooks] = useState<Book[]>([]);
    const allBooks = useAppSelector((state) => state.bookStore.books);
    useEffect(() => {
        const getAllBooks = async () => {
            
            setAllBooks(allBooks);
        }

        getAllBooks();
    }, [allBooks]);

    function getRelevantBooks() {
        return books.filter((givenBook: Book) => ((givenBook._id !== book._id) 
                    && 
                    (givenBook.level === book.level 
                        || givenBook.subject === book.subject 
                        || (givenBook.exam && (givenBook.exam === book.exam))
                        || (book.keywords.reduce((prev, keyword) => (prev || givenBook.keywords.includes(keyword)), false))
                    )
                )
            )
    }
    return (
        <section className={`max-w-7xl w-full mx-auto px-4 md:px-6 pt-12 md:pt-24 lg:pt-32 ${isModal ? "mb-4" : ""}`}>
            <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Other Products You May Find Useful</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Discover our top-selling and most popular books across various genres.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {getRelevantBooks().map((book: Book) => (
                        <ItemCard key={`book_${book._id}`} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
}