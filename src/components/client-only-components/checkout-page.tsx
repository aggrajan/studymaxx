"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Script from 'next/script';
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/schemas/checkoutSchema";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Address } from "@/model/Address";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function CheckoutPage() {
    const { user, userPresent } = useAppSelector((state) => state.auth);
    const cart = useAppSelector((state) => state.cart)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState(user?.name ? user.name : "");
    const [email, setEmail] = useState(user?.email ? user.email : "");
    const { toast } = useToast();
    const router = useRouter();

    const blankAddress = {
        address: "",
        city: "",
        state: "",
        pincode: undefined,
        landmark: "",
        contact: undefined,
        default: false,
        name: "",
        company: ""
    }

    const defaultAddress = user?.addresses.filter((address: Address) => address.default === true);
    const currentAddress = (defaultAddress && defaultAddress?.length > 0) ? defaultAddress[0] : blankAddress;

    const [address, setAddress] = useState(currentAddress);

    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            userId: (userPresent && user?._id) ? user._id : "",
            products: cart.cartItems,
            address: address,
            total: cart.total,
            subtotal: cart.subtotal,
            shipping: cart.shipping,
            discount: cart.discount,
            numberOfItems: cart.cartCount,
            name: (userPresent && user?.name) ? user.name : "",
            email: (userPresent && user?.email) ? user.email : "",
            orderStatus: "Placed"
        }
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);


    const createOrderId = async () => {
        try {
         const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           amount: (cart.total * 100).toFixed(0),
          }),
         });
      
         if (!response.ok) {
          throw new Error('Network response was not ok');
         }
      
         const data = await response.json();
         return data.orderId;
        } catch (error) {
         console.error('There was a problem with your fetch operation:', error);
        }
       };

    const processPayment = async (data: z.infer<typeof checkoutSchema>) => {
        try {
         const orderId: string = await createOrderId();
         const options = {
          key: process.env.RAZORPAY_KEYID,
          amount: (cart.total * 100).toFixed(0),
          currency: "INR",
          name: 'StudyMaxx',
          description: 'This payment is made to StudyMaxx',
          order_id: orderId,
          handler: async function (response: any) {
           const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
           };
      
           const result = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
           });
           const res = await result.json();
           if (res.isOk) {
            alert("payment succeed");
            const response = await axios.post(`/api/add-order`, data);
            if(response.status === 200) {
                toast({
                    title: "Order Placed Successfully",
                    description: "You can view your order details at Orders page",
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
           }
           else {
            alert(res.message);
           }
          },
          prefill: {
           name: user?.name ? user.name: name,
           email: user?.email ? user.email : email,
          },
          theme: {
           color: '#3399cc',
          },
         };
         if (typeof window !== "undefined" && window.Razorpay) {
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
              alert(response.error.description);
            });
            paymentObject.open();
          } else {
            console.error("Razorpay SDK not loaded");
          }
        } catch (error) {
         console.log(error);
        }
       };

    const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
        setIsSubmitting(true);
        try {
            await processPayment(data);
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

    
      

    if(!isMounted) return null;

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[55px]">
                <div className="w-full max-w-7xl p-8 space-y-8 bg-white rounded-lg shadow-md mt-16 mb-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Welcome to StudyMaxx
                        </h1>
                        <p className="mb-4">
                            Please place your order here
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField 
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your name" value={field.value} onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setName(e.target.value);
                                            }} disabled={userPresent ? true : false}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}      
                            />

                            <FormField 
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your email id" value={field.value} onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setEmail(e.target.value);
                                            }} disabled={userPresent ? true : false}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}      
                            />

                            <FormField
                                name="address"
                                control={form.control}
                                render={({ field }) => (
                                    <Card className="mt-4">
                                        <CardContent>
                                            <FormItem>
                                                <FormLabel>Recipient Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter recipient name" value={field.value.name} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["name"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Recipient Contact</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter recipient name" type="number" value={field.value.contact} 
                                                    onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["contact"] = e.target.valueAsNumber;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } onWheel={(e) => (e.target as HTMLElement).blur()} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Company Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter company name" value={field.value.company} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["company"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter your address" value={field.value.address} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["address"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter your city" value={field.value.city} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["city"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter your state" value={field.value.state} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["state"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Pincode</FormLabel>
                                                <FormControl>
                                                    <InputOTP id={`pincode`} maxLength={6} value={field.value.pincode ? field.value.pincode.toString(): ""} 
                                                        onChange={(value) => {
                                                        const updatedAddress = {...field.value};
                                                        updatedAddress.pincode = parseInt(value);
                                                        field.onChange(updatedAddress);
                                                    }}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                            <InputOTPSlot index={1} />
                                                            <InputOTPSlot index={2} />
                                                            <InputOTPSlot index={3} />
                                                            <InputOTPSlot index={4} />
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                            <FormItem>
                                                <FormLabel>Landmark</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="enter your landmark" value={field.value.landmark} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["landmark"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </CardContent>
                                    </Card>
                                )}
                            />
                            <div className="flex justify-end gap-2">
                                <Button type="submit" disabled={isSubmitting}>
                                    {
                                        isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Place Order')
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
        </>
    );
}