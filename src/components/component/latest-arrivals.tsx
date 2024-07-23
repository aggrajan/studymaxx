"use client"
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export function LatestArrivals() {
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
              plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
              className="w-full max-w-4xl"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img
                          src="/placeholder.svg"
                          width="150"
                          height="200"
                          alt="Book Cover"
                          className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                        />
                        <h3 className="text-lg font-semibold">The Great Gatsby</h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img
                          src="/placeholder.svg"
                          width="150"
                          height="200"
                          alt="Book Cover"
                          className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                        />
                        <h3 className="text-lg font-semibold">To Kill a Mockingbird</h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img
                          src="/placeholder.svg"
                          width="150"
                          height="200"
                          alt="Book Cover"
                          className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                        />
                        <h3 className="text-lg font-semibold">1984</h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <img
                          src="/placeholder.svg"
                          width="150"
                          height="200"
                          alt="Book Cover"
                          className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                        />
                        <h3 className="text-lg font-semibold">Pride and Prejudice</h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
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