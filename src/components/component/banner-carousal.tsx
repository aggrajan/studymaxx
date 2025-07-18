"use client"
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

export function BannerCarousal() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [autoplayPlugin, setAutoplayPlugin] = useState<any>(null);
    const [api, setApi] = useState<any>(null);
    const totalSlides = 7;

    const bannerData = [
        {
            id: 1,
            image: "/image copy 4.png",
            title: "Discover Excellence",
            subtitle: "Premium Educational Resources",
            description: "Unlock your potential with our comprehensive study materials"
        },
        {
            id: 2,
            image: "/image copy 7.png",
            title: "Learn & Grow",
            subtitle: "Expert-Curated Content",
            description: "Master new concepts with our expertly designed curriculum"
        },
        {
            id: 3,
            image: "/image copy 8.png",
            title: "Achieve Success",
            subtitle: "Results-Driven Learning",
            description: "Transform your academic journey with proven methodologies"
        },
        {
            id: 4,
            image: "/image copy 9.png",
            title: "Innovation in Education",
            subtitle: "Modern Learning Solutions",
            description: "Experience the future of education with cutting-edge resources"
        },
        {
            id: 5,
            image: "/image copy 10.png",
            title: "Knowledge Empowerment",
            subtitle: "Comprehensive Study Guides",
            description: "Empower yourself with knowledge that lasts a lifetime"
        },
        {
            id: 6,
            image: "/image copy 11.png",
            title: "Academic Excellence",
            subtitle: "Quality Education Materials",
            description: "Pursue excellence with our premium educational content"
        },
        {
            id: 7,
            image: "/image copy 12.png",
            title: "Future Ready",
            subtitle: "Next-Gen Learning",
            description: "Prepare for tomorrow with today's most advanced study tools"
        }
    ];

    useEffect(() => {
        const plugin = Autoplay({ delay: 4000, stopOnInteraction: false });
        setAutoplayPlugin(plugin);
        
        const interval = setInterval(() => {
            if (isPlaying) {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }
        }, 4000);
        
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (api) {
            api.on("select", () => {
                setCurrentSlide(api.selectedScrollSnap());
            });
        }
    }, [api]);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (autoplayPlugin) {
            if (isPlaying) {
                autoplayPlugin.stop();
            } else {
                autoplayPlugin.play();
            }
        }
    };

    const goToSlide = (index: number) => {
        if (api) {
            api.scrollTo(index);
            setCurrentSlide(index);
        }
    };

    const resetCarousel = () => {
        if (api) {
            api.scrollTo(0);
            setCurrentSlide(0);
            setIsPlaying(true);
            if (autoplayPlugin) {
                autoplayPlugin.play();
            }
        }
    };

    return (
        <div className="w-full overflow-hidden flex justify-center mt-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
            {/* Enhanced animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full animate-pulse delay-700"></div>
            </div>
            
            <div className="relative w-full">
                <Carousel
                    setApi={setApi}
                    plugins={autoplayPlugin ? [autoplayPlugin] : []}
                    className="w-full relative z-10"
                    opts={{loop: true}}
                >
                    <CarouselContent className="h-full">
                        {bannerData.map((banner, index) => (
                            <CarouselItem key={`banner_${banner.id}`} className="flex items-center justify-center h-full">
                                <div className="w-full h-full relative group overflow-hidden">
                                    {/* Main image */}
                                    <img 
                                        src={banner.image} 
                                        className="w-full h-full object-contain shadow-2xl rounded-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
                                        alt={banner.title}
                                    />
                                    
                                    {/* Slide number indicator */}
                                    <div className="absolute top-4 right-4 z-30">
                                        <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                            {index + 1} / {totalSlides}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    {/* Enhanced Navigation Buttons */}
                    <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 hover:border-white/50 w-12 h-12 hover:scale-110 transition-all duration-300 text-white shadow-lg hover:shadow-xl rounded-xl group" />
                    <CarouselNext className="right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 hover:border-white/50 w-12 h-12 hover:scale-110 transition-all duration-300 text-white shadow-lg hover:shadow-xl rounded-xl group" />
                </Carousel>

                {/* Enhanced Control Panel */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                    <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        {/* Slide Indicators */}
                        <div className="flex space-x-2 mb-4 justify-center">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`relative overflow-hidden rounded-full transition-all duration-300 cursor-pointer ${
                                        index === currentSlide
                                            ? 'w-8 h-3 bg-white shadow-lg'
                                            : 'w-3 h-3 bg-white/50 hover:bg-white/75 hover:scale-125'
                                    }`}
                                >
                                    {index === currentSlide && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-center space-x-3">
                            <Button
                                onClick={togglePlayPause}
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                            >
                                {isPlaying ? (
                                    <Pause className="w-4 h-4" />
                                ) : (
                                    <Play className="w-4 h-4" />
                                )}
                            </Button>
                            
                            <Button
                                onClick={resetCarousel}
                                variant="ghost"
                                size="sm"
                                className="text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </Button>

                            {/* Progress indicator */}
                            <div className="flex items-center space-x-2 ml-4">
                                <div className="text-white text-xs font-medium">
                                    {Math.round(((currentSlide + 1) / totalSlides) * 100)}%
                                </div>
                                <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide transition effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-50"></div>
                </div>
            </div>
        </div>
    );
}