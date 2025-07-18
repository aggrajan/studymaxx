"use client"
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

export function BannerCarousal() {
    return (
        <div className="w-full overflow-hidden flex justify-center mt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
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
                <img src="/image copy 4.png" className="w-full h-full object-cover shadow-2xl" />
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
                <img src="/image copy 7.png" className="aspect-[16/7] w-full shadow-2xl" />
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
                <img src="/image copy 8.png" className="aspect-[16/7] w-full shadow-2xl" />
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
                <img src="/image copy 9.png" className="aspect-[16/7] w-full shadow-2xl" />
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
                <img src="/image copy 10.png" className="aspect-[16/7] w-full shadow-2xl" />
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
                <img src="/image copy 11.png" className="aspect-[16/7] w-full shadow-2xl" />
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
                <img src="/image copy 12.png" className="aspect-[16/7] w-full shadow-2xl" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
          <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg border-0" />
        </Carousel>
      </div>
    );
}