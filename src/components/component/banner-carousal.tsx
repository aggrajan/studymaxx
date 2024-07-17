import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

export function BannerCarousal() {
    return (
        <div className="w-full overflow-hidden flex justify-center mt-16">
        <Carousel
          plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
          className="w-full"
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
                    <h3 className="text-lg font-semibold">New Release: The Midnight Library</h3>
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
                    <h3 className="text-lg font-semibold">Summer Sale: 50% Off</h3>
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
                    <h3 className="text-lg font-semibold">Book of the Month: The Vanishing Half</h3>
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
                    <h3 className="text-lg font-semibold">Holiday Sale: 25% Off</h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
}