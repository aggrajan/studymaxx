'use client'
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormDescription } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
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
import { Coupon } from "@/model/Coupon";
import getCoupons from "@/app/apiCalls/callCoupons";
import { editCouponSchema } from "@/schemas/editCouponSchema";

function EditCouponForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams<{ couponId: string }>();
    const couponId = params.couponId;
    const [coupon, setCoupon] = useState<Coupon>();

    const form = useForm<z.infer<typeof editCouponSchema>>({
        resolver: zodResolver(editCouponSchema),
        defaultValues: {
            id: couponId,
            couponName: '',
            couponType: '',
            couponDescription: '',
            couponValue: undefined,
            lastValidityDate: undefined,
            minimumAmount: undefined
        }
    });

    const { reset } = form;

    useEffect(() => {
        (async () => {
            const coupons = await getCoupons();
            const currentCoupon = coupons.filter((givenCoupon: Coupon) => givenCoupon._id === couponId)[0];
            if (currentCoupon) {
                setCoupon(currentCoupon);
                reset({
                    id: couponId,
                    couponName: currentCoupon.couponName,
                    couponType: currentCoupon.couponType,
                    couponDescription: currentCoupon.couponDescription,
                    couponValue: currentCoupon.couponValue,
                    lastValidityDate: new Date(currentCoupon.lastValidityDate), // Ensure it's a Date object
                    minimumAmount: currentCoupon.minimumAmount
                });
            }
        })();
    }, [couponId, reset]);

    const onSubmit = async (data: z.infer<typeof editCouponSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/edit-coupon', data);
            if (response.status === 200) {
                toast({
                    title: "Coupon updated",
                    description: "Coupon successfully edited in the database",
                    variant: "default"
                });
                router.push('/');
            } else {
                toast({
                    title: "Error Occurred",
                    description: "There might be some issue with the data provided",
                    variant: "destructive"
                });
                router.push('/');
            }
        } catch (error: any) {
            toast({
                title: "Error Occurred",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    const onDelete = async () => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/delete-coupon', { id: couponId });
            if(response.status === 200) {
                form.reset();
                
                toast({
                    title: "Coupon deleted",
                    description: "Coupon successfully deleted from the database",
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
        } catch (error: any) {
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
        <div className="flex justify-center items-center min-h-screen pt-32 pb-24 bg-gray-100">
            <div className="w-full max-w-5xl p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome to StudyMaxx
                    </h1>
                    <p className="mb-4">
                        Please edit a coupon
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
                            <Select onValueChange={field.onChange} value={field.value}>
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

                        <div className="flex justify-center items-center gap-8">
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-700 hover:bg-blue-800">
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Edit Coupon')
                                }
                            </Button>
                            <Button type="button" disabled={isSubmitting} className="bg-red-600 hover:bg-red-400" onClick={onDelete}>
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Delete Book')
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

export default EditCouponForm;