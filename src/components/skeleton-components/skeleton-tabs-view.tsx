import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


export function SkeletonTabView() {
    const [tab, setTab] = useState("about");

    const onTabChange = (value: string) => {
        setTab(value);
    }
    return (
        <Tabs defaultValue={tab} onValueChange={onTabChange} className="max-w-7xl w-full mx-auto px-4 md:px-6 pt-8">
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
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </CardContent>
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
                        These are the salient features for this book
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </CardContent>
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
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </CardContent>
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
                        This shows additional support for this book
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}