'use client'
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signInSchema";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthState } from "@/lib/slices/authSlice";
import { getProfile } from "@/app/apiCalls/callProfile";

function SignIn() {
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        });

        if(result?.error) {
            toast({
                title: "Login Failed",
                description: "Incorrect Email Id or Password",
                variant: "destructive"
            })
            setIsSubmitting(false);
        }

        if(result?.url) {
            toast({
                title: "Logged In",
                description: "Successfully logged in with correct credentials"
            })
            const user = await getProfile();
            dispatch(setAuthState(user));
            router.replace("/");
            setIsSubmitting(false);
        }
    }

    const handleGoogleSignIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await signIn("google", { redirect: false });
        
        if(result?.error) {
            toast({
                title: "Login Failed",
                description: "Incorrect Email Id or Password",
                variant: "destructive"
            })
            setIsSubmitting(false);
        }

        if(result?.url) {
            toast({
                title: "Logged In",
                description: "Successfully logged in with correct credentials"
            })
            router.replace("/");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[55px]">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome to StudyMaxx
                    </h1>
                    <p className="mb-4">
                        Sign in to start
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField 
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        <FormField 
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}      
                        />
                        <div className="flex justify-center items-center">
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-700 hover:bg-blue-800">
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Sign in')
                                }
                            </Button>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button onClick={handleGoogleSignIn} className="border border-black text-black bg-white hover:bg-gray-600 hover:text-white" disabled={isSubmitting}>
                                {
                                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : (<><img src="/google.svg" className="w-6 h-6 mr-2" />Sign In with Google</>)
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <div>
                        Not a member?{' '}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">Sign up</Link>
                    </div>
                    <div>
                        Forgot password?{' '}
                        <Link href="/reset-password" className="text-blue-600 hover:text-blue-800">Reset Password</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
