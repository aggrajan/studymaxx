"use client"
import { Separator } from "../ui/separator";
import { Target, BookOpen, Users, Award } from "lucide-react";

export function OurMission() {
    return (
        <section className="w-full pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative flex flex-col items-center justify-center space-y-16 px-6 md:px-12 text-center z-10">
                {/* Header Section */}
                <div className="max-w-4xl space-y-6">
                    <div className="relative inline-block">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Read. Succeed. Achieve.
                        </h2>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    </div>
                    <p className="text-slate-600 md:text-xl font-medium leading-relaxed">
                        Empowering students through quality education and exceptional learning resources
                    </p>
                </div>

                {/* Mission Content */}
                <div className="max-w-6xl w-full">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl transform -rotate-1"></div>
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200/50">
                            
                            {/* Mission Header */}
                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800">Our Mission</h3>
                            </div>

                            <Separator className="mb-8 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                            {/* Mission Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                {/* Mission Statement */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <div className="flex items-start gap-3 mb-4">
                                            <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-800 mb-2">Quality Education</h4>
                                                <p className="text-slate-600 leading-relaxed">
                                                    We, at STUDYMAXX, aim to bring out books and publications which shall serve as true guides and torchbearers for students. Our team works under the expert supervision of experienced authors who are masters in their respective fields and subjects.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Award className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-800 mb-2">Excellence & Accuracy</h4>
                                                <p className="text-slate-600 leading-relaxed">
                                                    We put in dedicated efforts and ample time into making our works as much error free as possible so that our end-users get to use products with a high degree of accuracy and perfection.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Vision Statement */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Users className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-800 mb-2">Community Building</h4>
                                                <p className="text-slate-600 leading-relaxed">
                                                    We believe that quality education is the cornerstone of personal and professional growth. At the heart of our mission lies a commitment to educational excellence and fostering a community of learners.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                        <div className="flex items-start gap-3 mb-4">
                                            <Target className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-800 mb-2">Future Vision</h4>
                                                <p className="text-slate-600 leading-relaxed">
                                                    We are passionate about education and dedicated to providing exceptional service, ensuring that every customer finds the perfect book to meet their needs. Together, we can create a brighter future through the power of learning.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <div className="text-center">
                                    <p className="text-slate-600 font-medium mb-4">
                                        Join us in our mission to transform education and empower learners worldwide
                                    </p>
                                    <div className="flex justify-center">
                                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}