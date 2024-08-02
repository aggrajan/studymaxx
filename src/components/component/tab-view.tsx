"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


export function TabView({ about, salient_features, useful_for, additional_support } : { about: string[], salient_features: string[], useful_for: string[], additional_support: string[] } ) {
    const [tab, setTab] = useState("about");
    const [fullAbout, setFullAbout] = useState(false);
    const [fullSalientFeatures, setFullSalientFeatures] = useState(false);
    const [fullUsefulFor, setFullUsefulFor] = useState(false);
    const [fullAdditionalSupport, setFullAdditionalSupport] = useState(false);

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
                    <CardContent className="space-y-2">{
                    about.length === 0 
                    ? <div className="text-slate-800 text-sm">No description available</div> 
                    : (
                        about.length === 1 
                        ? <div className="text-slate-800 text-sm">
                            {about[0]}
                        </div> 
                        : (
                            about.length > 3 
                            ? <div className="text-slate-800 text-sm">
                                {fullAbout 
                                    ? about.map((aboutText: string, index: number) => (
                                            <li key={`aboutText_${index}`}>{aboutText}</li>
                                        ))
                                    : Array.from({length: 3}, (_, i) => i).map((index: number) => (
                                            <li key={`aboutText_${index}`}>{about[index]}</li>
                                        ))
                                }
                              </div>
                            : <div className="text-slate-800 text-sm"> 
                                {
                                    about.map((aboutText: string, index: number) => (
                                        <li key={`aboutText_${index}`}>{aboutText}</li>
                                    ))
                                }
                                </div>
                        )
                    )}
                    </CardContent>
                    {about.length > 3 && <CardFooter>
                        {fullAbout ? <Button variant="secondary" onClick={() => {setFullAbout((prev) => !prev)}} >Show Less</Button> : <Button variant="secondary" onClick={() => {setFullAbout((prev) => !prev)}} >Read More</Button>}
                    </CardFooter>}
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
                    <CardContent className="space-y-2">{
                    salient_features.length === 0 
                    ? <div className="text-slate-800 text-sm">No features available</div> 
                    : (
                        salient_features.length === 1 
                        ? <div className="text-slate-800 text-sm">
                            {salient_features[0]}
                        </div> 
                        : (
                            salient_features.length > 3 
                            ? <div className="text-slate-800 text-sm">
                                {fullSalientFeatures 
                                    ? salient_features.map((feature: string, index: number) => (
                                            <li key={`salient_features_${index}`}>{feature}</li>
                                        ))
                                    : Array.from({length: 3}, (_, i) => i).map((index: number) => (
                                            <li key={`salient_features_${index}`}>{salient_features[index]}</li>
                                        ))
                                }
                              </div>
                            : <div className="text-slate-800 text-sm"> 
                                {
                                    salient_features.map((feature: string, index: number) => (
                                        <li key={`salient_features_${index}`}>{feature}</li>
                                    ))
                                }
                                </div>
                        )
                    )}
                    </CardContent>
                    {salient_features.length > 3 && <CardFooter>
                        {fullSalientFeatures ? <Button variant="secondary" onClick={() => {setFullSalientFeatures((prev) => !prev)}} >Show Less</Button> : <Button variant="secondary" onClick={() => {setFullSalientFeatures((prev) => !prev)}} >Read More</Button>}
                    </CardFooter>}
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
                    <CardContent className="space-y-2">{
                    useful_for.length === 0 
                    ? <div className="text-slate-800 text-sm">No data available</div> 
                    : (
                        useful_for.length === 1 
                        ? <div className="text-slate-800 text-sm">
                            {useful_for[0]}
                        </div> 
                        : (
                            useful_for.length > 3 
                            ? <div className="text-slate-800 text-sm">
                                {fullUsefulFor 
                                    ? useful_for.map((useful: string, index: number) => (
                                            <li key={`useful_for_${index}`}>{useful}</li>
                                        ))
                                    : Array.from({length: 3}, (_, i) => i).map((index: number) => (
                                            <li key={`useful_for_${index}`}>{useful_for[index]}</li>
                                        ))
                                }
                              </div>
                            : <div className="text-slate-800 text-sm"> 
                                {
                                    useful_for.map((useful: string, index: number) => (
                                        <li key={`useful_for_${index}`}>{useful}</li>
                                    ))
                                }
                                </div>
                        )
                    )}
                    </CardContent>
                    {useful_for.length > 3 && <CardFooter>
                        {fullUsefulFor ? <Button variant="secondary" onClick={() => {setFullUsefulFor((prev) => !prev)}} >Show Less</Button> : <Button variant="secondary" onClick={() => {setFullUsefulFor((prev) => !prev)}} >Read More</Button>}
                    </CardFooter>}
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
                    <CardContent className="space-y-2">{
                    additional_support.length === 0 
                    ? <div className="text-slate-800 text-sm">No support available</div> 
                    : (
                        additional_support.length === 1 
                        ? <div className="text-slate-800 text-sm">
                            {additional_support[0]}
                        </div> 
                        : (
                            additional_support.length > 3 
                            ? <div className="text-slate-800 text-sm">
                                {fullAdditionalSupport 
                                    ? additional_support.map((support: string, index: number) => (
                                            <li key={`additional_support_${index}`}>{support}</li>
                                        ))
                                    : Array.from({length: 3}, (_, i) => i).map((index: number) => (
                                            <li key={`additional_support_${index}`}>{additional_support[index]}</li>
                                        ))
                                }
                              </div>
                            : <div className="text-slate-800 text-sm"> 
                                {
                                    additional_support.map((support: string, index: number) => (
                                        <li key={`additional_support_${index}`}>{support}</li>
                                    ))
                                }
                                </div>
                        )
                    )}
                    </CardContent>
                    {additional_support.length > 3 && <CardFooter>
                        {fullAdditionalSupport ? <Button variant="secondary" onClick={() => {setFullAdditionalSupport((prev) => !prev)}} >Show Less</Button> : <Button variant="secondary" onClick={() => {setFullAdditionalSupport((prev) => !prev)}} >Read More</Button>}
                    </CardFooter>}
                </Card>
            </TabsContent>
        </Tabs>
    );
}