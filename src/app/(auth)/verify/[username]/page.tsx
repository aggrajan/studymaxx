'use client'
import React, { useState } from "react"
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams<{username: string}>();
    const {toast} = useToast();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);
        try {
            
            const response = await axios.post(`/api/verify`, {
                username: params.username,
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
                        Please verify your account
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                            name="token"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification OTP</FormLabel>
                                    <FormControl>
                                        <Input placeholder="OTP" {...field} type="number" onChange={(e) => {
                                            field.onChange(e);
                                        }}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Verify')
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    </>;
}

export default VerifyAccount;