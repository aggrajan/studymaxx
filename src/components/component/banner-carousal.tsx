"use client"
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

export function BannerCarousal() {
    return (
        <div className="w-full overflow-hidden flex justify-center mt-[55px] bg-gray-100">
        <Carousel
          plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
          className="w-full"
          opts={{loop: true}}
        >
          <CarouselContent className="h-full">
            <CarouselItem className="flex items-center justify-center h-full">
              <div className="w-full h-full">
                {/* <Card className="rounded-none h-full aspect-[30/9]">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <img
                      src="/placeholder.svg"
                      width="150"
                      height="200"
                      alt="Book Cover"
                      className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-semibold">New Release: The Midnight Library</h3>
                  </CardContent>
                </Card> */}
                <img src="/banner1.png" className="w-full h-full object-cover" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-full">
                {/* <Card className="rounded-none h-full aspect-[30/9]">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <img
                      src="/placeholder.svg"
                      width="150"
                      height="200"
                      alt="Book Cover"
                      className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-semibold">Summer Sale: 50% Off</h3>
                  </CardContent>
                </Card> */}
                <img src="/banner1.png" className="object-cover w-full h-full" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-full">
                {/* <Card className="rounded-none h-full aspect-[30/9]">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <img
                      src="/placeholder.svg"
                      width="150"
                      height="200"
                      alt="Book Cover"
                      className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-semibold">Book of the Month: The Vanishing Half</h3>
                  </CardContent>
                </Card> */}
                <img src="/banner1.png" className="object-cover w-full h-full" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-full h-full">
                {/* <Card className="rounded-none h-full aspect-[30/9]">
                  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                    <img
                      src="/placeholder.svg"
                      width="150"
                      height="200"
                      alt="Book Cover"
                      className="mb-4 aspect-[3/4] overflow-hidden rounded-lg object-cover"
                    />
                    <h3 className="text-lg font-semibold">Holiday Sale: 25% Off</h3>
                  </CardContent>
                </Card> */}
                <img src="/banner1.png" className="object-cover w-full h-full" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
}