import { useEffect, useState } from "react";
import { ItemCard } from "./item-card";
import { Book } from "@/model/Books";
import { getBooks } from "@/app/apiCalls/callBooks";

export function OtherProductsYouMayFindUseful({ book, isModal }: { book: Book, isModal: boolean }) {
    const [books, setAllBooks] = useState([]);
    useEffect(() => {
        const getAllBooks = async () => {
            const allBooks = await getBooks();
            setAllBooks(allBooks);
        }

        getAllBooks();
    }, []);

    function UniqueHashCode(obj: object){
        var str = JSON.stringify(obj) 
        var hash = 0;
        if (str.length == 0) return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

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
        <section className={`max-w-7xl mx-auto px-4 md:px-6 pt-12 md:pt-24 lg:pt-32 ${isModal ? "mb-4" : ""}`}>
            <div className="container flex flex-col justify-center space-y-4 px-4 md:px-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Other Products You May Find Useful</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Discover our top-selling and most popular books across various genres.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getRelevantBooks().map((book: Book) => (
                        <ItemCard key={UniqueHashCode(book)} bookId={book._id as number} />
                    ))}
                </div>
            </div>
        </section>
    );
}