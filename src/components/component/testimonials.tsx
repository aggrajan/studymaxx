"use client"

import Link from "next/link";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    id: 1,
    text: 'The customer service I received was exceptional. The support team went above and beyond to address my concerns.',
    author: 'Person 1',
    designation: 'CEO, Acme Inc'
  },
  {
    id: 2,
    text: 'The customer service I received was exceptional. The support team went above and beyond to address my concerns.',
    author: 'Person 2',
    designation: 'CEO, Acme Inc'
  },
  {
    id: 3,
    text: 'The customer service I received was exceptional. The support team went above and beyond to address my concerns.',
    author: 'Person 3',
    designation: 'CEO, Acme Inc'
  },
  {
    id: 4,
    text: 'The customer service I received was exceptional. The support team went above and beyond to address my concerns.',
    author: 'Person 4',
    designation: 'CEO, Acme Inc'
  },
  {
    id: 5,
    text: 'The customer service I received was exceptional. The support team went above and beyond to address my concerns.',
    author: 'Person 5',
    designation: 'CEO, Acme Inc'
  },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 h-full">
    <div className="container flex flex-col items-center justify-center space-y-4 px-4 md:px-6 text-center">
      <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Testimonials</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Discover our top-selling and most popular books across various genres.
              </p>
      </div>
    <div>
    <Carousel 
      setApi={setApi}
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
      className="w-full min-h-72 hidden lg:block"
    >
      <CarouselContent>
      {testimonials.concat(testimonials.slice(0, 2)).map((testimonial, index) => (
          <CarouselItem key={index} className="basis-1/3 select-none">
          <Card className={`transition-all duration-500 ease-in-out ${index === current ? 'bg-gray-200 scale-110 m-4' : 'scale-[0.8] opacity-75 mt-4 ml-4 mr-4 mb-4'}`}>
            <CardContent className="flex flex-col items-start justify-center p-6">
            <blockquote className="text-lg font-semibold leading-snug min-h-32">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-4">
              <img src="/placeholder.svg" width={48} height={48} alt="Avatar" className="h-12 w-12 rounded-full border border-black" />
              <div className="flex flex-col items-start">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.designation}</div>
              </div>
            </div>
            </CardContent>
          </Card>
        </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
    </div>
    <Carousel 
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
      className="w-full max-w-4xl block lg:hidden"
    >
      <CarouselContent>
      {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
          <Card className="mx-2">
            <CardContent className="flex flex-col items-start justify-center p-6">
            <blockquote className="text-lg font-semibold leading-snug">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>
            <div className="mt-4 flex items-center gap-4">
              <img src="/placeholder.svg" width={48} height={48} alt="Avatar" className="h-12 w-12 rounded-full" />
              <div className="flex flex-col items-start">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.designation}</div>
              </div>
            </div>
            </CardContent>
          </Card>
        </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
    </div>
    <div className="lg:flex justify-center mt-4 hidden">
      {testimonials.map((_, index) => (
        <div
          key={index}
          className={`h-2 w-2 bg-gray-500 rounded-full mx-1 transition-all duration-500 ease-in-out ${
            index === current-1 ? 'w-4' : '' 
          } cursor-pointer`}
          onClick={(e) => {
            e.preventDefault();
            api?.scrollTo(index);
          }}
        ></div>
      ))}
    </div>
    </section>
  );
}