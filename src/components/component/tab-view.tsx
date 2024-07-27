"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


export function TabView() {
    const [tab, setTab] = useState("about");

    const onTabChange = (value: string) => {
        setTab(value);
    }
    return (
        <Tabs defaultValue={tab} onValueChange={onTabChange} className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="about" className="mr-1 transition-all duration-300 hover:bg-slate-300 hover:text-black">About The Book</TabsTrigger>
                <TabsTrigger value="features" className="ml-1 md:mx-1 transition-all duration-300 hover:bg-slate-300 hover:text-black">Salient Features</TabsTrigger>
                <TabsTrigger value="useful" className="mx-1 hidden md:block transition-all duration-300 hover:bg-slate-300 hover:text-black">Useful For</TabsTrigger>
                <TabsTrigger value="support" className="ml-1 hidden md:block transition-all duration-300 hover:bg-slate-300 hover:text-black">Additional Support</TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-2 md:hidden mt-2">
                <TabsTrigger value="useful" className="mr-1 md:hidden transition-all duration-300 hover:bg-slate-300 hover:text-black">Useful For</TabsTrigger>
                <TabsTrigger value="support" className="ml-1 md:hidden transition-all duration-300 hover:bg-slate-300 hover:text-black">Additional Support</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
                <Card>
                    <CardHeader>
                        <div className="flex justify-start items-center gap-1">
                            <img src="/book.svg" width={22} />
                            <CardTitle>About The Book</CardTitle>
                        </div>
                        <CardDescription>
                            This is a description about the book you are viewing
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <div className="text-slate-800 text-sm">&quot;Mathematics for Class 6&quot; by R.S. Aggarwal is a comprehensive textbook designed to cater to the learning needs of middle school students. Known for its clear explanations and structured approach, this book serves as an essential guide for mastering mathematical concepts at the Class 6 level.
                    </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="secondary">Read More</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="features">
                <Card>
                    <CardHeader>
                        <div className="flex justify-start items-center gap-1">
                            <img src="/features.svg" width={22} />
                            <CardTitle>Salient Features</CardTitle>
                        </div>
                        <CardDescription>
                        These are the salient features
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-slate-800 text-sm">&quot;Mathematics for Class 6&quot; by R.S. Aggarwal stands out for its clear, step-by-step explanations and structured approach to learning. Each topic is meticulously broken down to ensure conceptual clarity, supported by numerous worked examples and a wide range of exercises that cater to different difficulty levels. The book includes chapter summaries for quick revision, multiple-choice questions for competitive exam preparation, and highlights real-life applications of mathematical concepts, making it a comprehensive resource for middle school students.</div>
                    </CardContent>
                    <CardFooter>
                    <Button variant="secondary">Read More</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="useful">
                <Card>
                    <CardHeader>
                        <div className="flex justify-start items-center gap-1">
                        <img src="/useful.svg" width={24} />
                        <CardTitle>Useful For</CardTitle>
                        </div>
                        <CardDescription>
                            This section describes the usefullness of the book
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <div className="text-slate-800 text-sm">This textbook is ideal for Class 6 students who seek a thorough understanding of mathematics. It is particularly useful for students preparing for school exams, as well as those aspiring to excel in competitive exams where a strong foundation in mathematics is crucial. Teachers and tutors will also find this book valuable for its structured content and variety of practice problems that facilitate effective teaching and learning.</div>
                    </CardContent>
                    <CardFooter>
                    <Button variant="secondary">Read More</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="support">
                <Card>
                    <CardHeader>
                        <div className="flex justify-start items-center gap-1">
                            <img src="/support.svg" width={22} />
                            <CardTitle>Additional Support</CardTitle>
                        </div>
                        <CardDescription>
                        This shows additional support
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <div className="text-slate-800 text-sm">To complement the textbook, students can access additional support through a variety of resources. Supplementary materials such as solution guides, online tutorials, and interactive practice sessions are available to enhance learning. These resources provide further explanations, step-by-step solutions, and additional practice problems, helping students to reinforce their understanding and excel in their studies.</div>
                    </CardContent>
                    <CardFooter>
                    <Button variant="secondary">Read More</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}