'use client'
import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { verifyNewPasswordSchema } from "@/schemas/verifyNewPasswordSchema";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { PasswordInput } from "@/components/ui/password-input";

const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams<{username: string}>();
    const {toast} = useToast();
    const form = useForm<z.infer<typeof verifyNewPasswordSchema>>({
        resolver: zodResolver(verifyNewPasswordSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof verifyNewPasswordSchema>) => {
        setIsSubmitting(true);
        try {
            
            const response = await axios.post(`/api/verify-reset-password`, {
                newPassword: data.newPassword,
                token: data.token
            })

            toast({
                title: "Success",
                description: response.data.message
            })
            setIsSubmitting(false);
            router.replace('/sign-in');
        } catch(error: any) {
            console.error("Error in verification of user: ", error.message);
            const axiosError = error as AxiosError<ApiResponse>;
            const errorMessage = axiosError.response?.data.message;
            toast({
                title: "Verification Failed",
                description: errorMessage,
                variant: "destructive"
            });
            setIsSubmitting(false);
        }
    }

    return <>
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome to StudyMaxx
                    </h1>
                    <p className="mb-4">
                        Please enter your new password and OTP
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
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
                            <FormDescription>
                                Please enter the one-time password sent at your email id.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                            name="newPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Enter your new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        
                        <Button type="submit" disabled={isSubmitting} className="bg-blue-700 hover:bg-blue-800">
                            {
                                isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Update password')
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    </>;
}

export default VerifyAccount;