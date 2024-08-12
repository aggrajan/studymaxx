"use client";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useAppSelector } from "@/lib/hooks";
import { Book } from "@/model/Books";
import { Author } from "@/model/Authors";
import { useRouter } from "next/navigation";

export function LatestArrivals() {
    const route = useRouter();
    const allBooks = useAppSelector((state) => state.bookStore.books);
    const [isMounted, setIsMounted] = useState(false);
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [current, setCurrent] = useState(0);
  
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const latestBooks = allBooks.filter((book: Book) => book.latest);

    function getAuthorNames(authors: Author[] | undefined): string {
        if (!authors) return "";
        return authors.map(author => author.name).filter(Boolean).join(", ");
    }

    useEffect(() => {
        if (api) {
            const updateCurrent = () => setCurrent(api.selectedScrollSnap() % latestBooks.length);
            updateCurrent(); // Update initially
            api.on("select", updateCurrent); // Update on select
            return () => {
                api.off("select", updateCurrent); // Clean up the listener on unmount
            };
        }
    }, [api, latestBooks.length]);

    if (!isMounted) return null;

    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
            <div className="flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
                <div className="space-y-2 mb-0 sm:mb-5 md:mb-8 lg:mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest Arrivals</h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Discover our top-selling and most popular books across various genres.
                    </p>
                </div>
                <Carousel
                    setApi={setApi}
                    opts={{ align: "start", loop: true }}
                    plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
                    className="max-w-7xl hidden lg:block"
                >
                    <CarouselContent>
                        {latestBooks.map((book: Book, index: number) => (
                            <CarouselItem
                                key={`latestBook_${book._id}`}
                                className={`lg:basis-1/3 select-none`}
                            >
                                <Card
                                    className={`cursor-pointer shadow-2xl rounded-sm transition-all duration-500 ease-in-out ${
                                        index === (current + 1) % latestBooks.length
                                            ? 'scale-[0.9] m-0'
                                            : 'scale-[0.7] opacity-80 mt-4'
                                    }`}
                                    onClick={() => route.push(`/products/${book._id}`)}
                                >
                                    <img
                                        src={book.image}
                                        alt="Book Image"
                                        className="w-full cursor-pointer rounded-t-none"
                                    />
                                    <CardContent className="flex flex-col p-2 sm:p-3">
                                        <div className="text-md lg:text-lg font-semibold mb-5">
                                            {book.title}
                                        </div>
                                        {book.latest ? <img src="/latest.svg" alt="Latest Icon" className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-3 -right-3" /> : null}
                                        <div className="text-xs md:text-sm text-muted-foreground">
                                            by: {getAuthorNames(book.authors)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <span className="hidden lg:inline">
                        <CarouselPrevious />
                    </span>
                    <span className="hidden lg:inline">
                        <CarouselNext />
                    </span>
                </Carousel>

                <Carousel
  
                    opts={{ align: "start", loop: true }}
                    plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
                    className="w-full block lg:hidden"
                >
                    <CarouselContent>
                        {latestBooks.map((book: Book) => (
                            <CarouselItem
                                key={`latestBook_${book._id}`}
                                className={`select-none cursor-pointer`}
                            >
                                <Card
                                    className={`relative rounded-sm transition-all duration-500 ease-in-out mx-auto w-3/4 sm:w-2/4`}
                                    onClick={() => route.push(`/products/${book._id}`)}
                                >
                                    <img
                                        src={book.image}
                                        alt="Book Image"
                                        className="w-full shadow-2xl rounded-t-none border-black border-2"
                                    />
                                    <CardContent className="relative flex flex-col p-2 sm:p-3">
                                        <div className="text-lg lg:text-xl font-semibold mb-5">
                                            {book.title}
                                        </div>
                                        {book.latest ? <img src="/latest.svg" alt="Latest Icon" className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-3 -right-3 z-50" /> : null}
                                        <div className="text-xs md:text-sm text-muted-foreground">
                                            by: {getAuthorNames(book.authors)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
