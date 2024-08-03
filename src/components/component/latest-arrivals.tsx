"use client"
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useAppSelector } from "@/lib/hooks";
import { Book } from "@/model/Books";

export function LatestArrivals() {
    const allBooks = useAppSelector((state) => state.bookStore.books)
    const latestBooks = allBooks.filter((book: Book) => book.latest === true);
    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Latest Arrivals</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover our top-selling and most popular books across various genres.
              </p>
            </div>
            <Carousel
              plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
              className="w-full max-w-4xl"
              opts={{loop: true}}
            >
              <CarouselContent>
                {
                  latestBooks.map((book: Book) => (
                  <CarouselItem>                 
                    <div className="p-1">
                      <Card className="rounded-md">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <img
                            src={book.image}
                            width="150"
                            height="200"
                            alt="Book Cover"
                            className="mb-4 aspect-[3/4] overflow-hidden border-2 border-black object-cover"
                          />
                          <h3 className="text-lg font-semibold">{book.title}</h3>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  ))
                }
              </CarouselContent>
              <span className="hidden lg:inline">
                <CarouselPrevious />
              </span>
              <span className="hidden lg:inline">
                <CarouselNext />
              </span>
            </Carousel>
          </div>
        </section>
    );
}