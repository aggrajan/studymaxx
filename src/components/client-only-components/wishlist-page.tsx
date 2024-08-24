"use client";
import { useAppSelector } from "@/lib/hooks";
import { Book } from "@/model/Books";
import { ItemCard } from "../component/item-card";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export function WishlistPage() {
    const { userPresent, user } = useAppSelector((state) => state.auth);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="mt-[55px] w-screen h-screen flex justify-center items-center text-xl font-semibold tracking-tighter sm:text-2xl bg-gray-100">
                            <LoaderCircle className="mr-2 h-7 w-7 duration-200 animate-spin"/> Loading...
                        </div>;; // Prevents rendering on the server side

    return (
        <>
            {(userPresent && user && user.wishlist.length > 0) ? (
                <section className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="container px-4 md:px-6 gap-8 pb-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Wishlist</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
                            Discover our top-selling and most popular books across various genres.
                        </p>
                    </div>
                    <div className="container md:px-6 pt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {user.wishlist.map((book: Book) => (
                                <ItemCard key={`book_${book._id}`} book={book} />
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <div className="h-full w-full flex justify-center items-center min-h-screen ">
                    You haven&apos;t selected any items for wishlist yet!
                </div>
            )}
        </>
    );
}
