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
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Author } from "@/model/Authors";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import Link from "next/link";

export default function CheckoutPage() {
    const { user, userPresent } = useAppSelector((state) => state.auth);
    const cart = useAppSelector((state) => state.checkout)
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
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            userId: (userPresent && user?._id) ? user._id : "",
            products: cart.cartItems,
            address: currentAddress,
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

    function getAuthors(authors: Author[] | undefined): string {
        if(authors ===  undefined) return "";
        const authorsName = authors.map((author) => author.name)
        return authorsName.join(", ");
    }
    function getDiscountedPrice(originalPrice: number, discount: number): number {
        return (originalPrice * (100 - discount)) / 100.0;
    }


    if(!isMounted) return null;

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[55px]">
              <div className="grid gap-8 md:grid-cols-[2fr_1fr] ml-10 mr-10">
                <div className="w-full max-w-7xl p-8 space-y-8 bg-white rounded-lg shadow-md mt-16 md:mb-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Welcome to StudyMaxx
                        </h1>
                        <p className="mb-4">
                            Please place your order here
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                            }} />
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
                                    <Card className="mt-4 rounded-sm">
                                        <CardContent className="space-y-6 mt-5">
                                            <h1 className="font-medium text-xl">Choose Your Address</h1>
                                            { userPresent && 
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button type="button">Select any other address</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Your Addresses</DialogTitle>
                                                            <DialogDescription>
                                                                You can choose only one of your registered addresses. If you want to use any other address, then either you can enter manually or add another address in your profile.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <RadioGroup defaultValue={`${selectedAddressIndex}`} onValueChange={(value: string) => {
                                                            let index = parseInt(value);
                                                            const selectedAddress = user?.addresses.filter((address: Address, addressIndex: number) => addressIndex === index)[0];
                                                            if(selectedAddress) {
                                                                field.onChange(selectedAddress);
                                                                setSelectedAddressIndex(index);
                                                            }
                                                        }}>
                                                            {(user?.addresses && user.addresses.length > 0) ? user.addresses.map((address: Address, index: number) => (
                                                                <div className="flex items-center space-x-2" key={`radioitem_${index}`}>
                                                                    <RadioGroupItem value={`${index}`} id={`radio_${index}`} className="w-fit" />
                                                                    <Label htmlFor={`radio_${index}`} className="cursor-pointer">
                                                                        <span className="font-normal text-base">{address.name}</span>
                                                                        <span className="font-light text-sm ml-1">{address.address}</span>
                                                                    </Label>
                                                                </div>
                                                            )) : <div>You have no saved addresses. You can edit your <Link href="/user-profile" className="font-normal text-gray-600 cursor-pointer underline underline-offset-4" >Profile</Link> to add one or more addresses.</div>}
                                                        </RadioGroup>
                                                        <DialogFooter className="sm:justify-start">
                                                        <DialogClose asChild>
                                                            <Button type="button" variant="secondary">
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            }
                                            <div className="grid grid-cols-2 gap-4">
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
                                            </div>

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
                                                    <Textarea placeholder="enter your address" value={field.value.address} onChange={
                                                        (e) => {
                                                            const updatedAddress = {...field.value};
                                                            updatedAddress["address"] = e.target.value;
                                                            field.onChange(updatedAddress);
                                                        }
                                                    } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            <div className="grid lg:grid-cols-2 gap-4">
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
                                            </div>
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
                <div className="md:mt-16 min-w-[25rem]">
                    <h2 className="font-bold tracking-tighter text-2xl mb-3">Your Products</h2>
                    <div className="flex flex-col gap-y-4 w-full mb-10">
                        {(cart.cartCount > 0) ? cart.cartItems.map((item, index) => (
                        <div key={`hover_cart_element_${index}`} className="flex flex-row justify-start items-center gap-x-4 w-full">
                            
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    width={80}
                                    height={100}
                                    className="object-cover cursor-pointer"
                                    onClick={() => {router.push(`/products/${item.product._id}`)}}
                                />
                            
                            <div onClick={() => {router.push(`/products/${item.product._id}`)}} className="cursor-pointer w-full">
                            <h3 className="truncate-text font-semibold text-md w-full">{(item.product.title)}</h3>
                            <Separator className="w-full mt-2 mb-1" />
                            <p className="truncate-text text-muted-foreground text-xs w-full">{getAuthors(item.product.authors)}</p>
                            <div className="flex justify-start items-center gap-2">
                                {(item.product && item.product.discount && (item.product.discount > 0)) ? <div className="text-md md:text-lg font-semibold text-primary">&#8377;{getDiscountedPrice(item.product.price, item.product.discount).toFixed(0)}</div> : null}
                                <div className={`${(item.product && item.product.discount && (item.product.discount > 0)) ? "text-xs md:text-sm font-semibold text-muted-foreground line-through": "text-md md:text-lg font-semibold text-primary"}`}>&#8377;{item.product.price.toFixed(0)}</div>
                                {(item.product && item.product.discount && (item.product.discount > 0)) ? <Badge variant="default" className="text-xs scale-[55%] md:scale-75 lg:scale-75">
                                {(item.product.discount).toFixed(0)}% OFF
                                </Badge> : null}
                                <Badge className="text-md scale-[55%] md:scale-75 lg:scale-75 -ml-4">Qty: {item.quantity}</Badge>
                            </div>
                            </div>
                        </div>
                        ))

                        : <div className="flex justify-center items-center">
                        Your cart is empty
                        </div>}
                    </div>
                    <div className="bg-muted border-2 border-gray-300 p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="grid gap-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>&#8377;{cart.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>&#8377;{cart.cartCount > 0 ? cart.shipping.toFixed(2): 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-&#8377;{cart.cartCount > 0 ? cart.discount.toFixed(2) : 0}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>&#8377;{(cart.total).toFixed(2)}</span>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
        </>
    );
}