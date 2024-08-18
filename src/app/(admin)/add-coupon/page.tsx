'use client'
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { couponSchema } from "@/schemas/couponSchema";
import { Form, FormDescription } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { couponTypes } from '@/model/Enums';
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

function AddCouponForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof couponSchema>>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            couponName: '',
            couponType: '',
            couponDescription: '',
            couponValue: undefined,
            lastValidityDate: new Date(),
            minimumAmount: undefined
        }
    });

    const onSubmit = async (data: z.infer<typeof couponSchema>) => {
        setIsSubmitting(true);
        try{
            const response = await axios.post('/api/add-coupon', data);
            if(response.status === 200) {
                toast({
                    title: "Coupon added",
                    description: "Coupon successfully added to database",
                    variant: "default"
                });
                
                router.push('/');
            } else {
                toast({
                    title: "Error Occured",
                    description: "There might be some issue with the data provided",
                    variant: "destructive"
                });
                
                router.push('/');
            }
        } catch(error: any) {
            toast({
                title: "Error Occured",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
        
    }

    return (
        <div className="flex justify-center items-center min-h-screen mt-32 mb-24">
            <div className="w-full max-w-5xl p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome to StudyMaxx
                    </h1>
                    <p className="mb-4">
                        Please add a coupon
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                            name="couponName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coupon Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name.." {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        <FormField 
                            name="couponDescription"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coupon Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="description..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                            name="couponValue"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coupon Value</FormLabel>
                                    <FormControl>
                                        <Input placeholder="value" type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} onWheel={(e) => (e.target as HTMLElement).blur()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField 
                            name="minimumAmount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Minimum Amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="minimum amount in rupees" type="number" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} onWheel={(e) => (e.target as HTMLElement).blur()} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />

                        <FormField
                        control={form.control}
                        name="couponType"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Coupon Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {couponTypes.map((couponType, index) => {
                                    if(couponType === "") return null;
                                    return <SelectItem key={`couponType_${index}`} value={couponType}>
                                        {couponType}
                                    </SelectItem>
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="lastValidityDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel>Last Date of Validity</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This date will dictate the last valid date upto which the coupon can be applied
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <div className="flex justify-center items-center">
                            <Button type="submit" disabled={isSubmitting}>
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Add Coupon')
                                }
                            </Button>
                        </div>
                        
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        <Link href="/" className="text-blue-600 hover:text-blue-800">Visit Home?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AddCouponForm;