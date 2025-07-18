"use client"
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useState, useEffect } from "react";

export function BannerCarousal() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 7;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full overflow-hidden flex justify-center mt-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse delay-500"></div>
            </div>
            
            <Carousel
                plugins={[Autoplay({ delay: 2500, stopOnInteraction: true })]}
                className="w-full relative z-10"
                opts={{loop: true}}
            >
                <CarouselContent className="h-full">
                    <CarouselItem className="flex items-center justify-center h-full">
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 4.png" 
                                className="w-full h-full object-cover shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 7.png" 
                                className="aspect-[16/7] w-full shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 2"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 8.png" 
                                className="aspect-[16/7] w-full shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 3"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 9.png" 
                                className="aspect-[16/7] w-full shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 10.png" 
                                className="aspect-[16/7] w-full shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 5"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 11.png" 
                                className="aspect-[16/7] w-full shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 6"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="w-full h-full relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-rose-600/10 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
                            <img 
                                src="/image copy 12.png" 
                                className="aspect-[16/7] w-full shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                alt="Banner 7"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"></div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                
                {/* Enhanced Navigation Buttons */}
                <CarouselPrevious className="left-6 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl border-0 w-12 h-12 hover:scale-110 transition-all duration-300" />
                <CarouselNext className="right-6 bg-white/90 backdrop-blur-md hover:bg-white shadow-xl border-0 w-12 h-12 hover:scale-110 transition-all duration-300" />
                
                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                                index === currentSlide % totalSlides
                                    ? 'bg-white shadow-lg scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
}