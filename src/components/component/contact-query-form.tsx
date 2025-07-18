"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useAppSelector } from "@/lib/hooks";
import { querySchema } from "@/schemas/querySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ContactQueryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof querySchema>>({
      resolver: zodResolver(querySchema),
      defaultValues: {
        userId: user ? user._id : undefined,
        name: user ? user.name : '',
        email: user ? user.email : '',
        subject: '',
        message: ''
      }
  });

  const onSubmit = async (data: z.infer<typeof querySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/query`, data);
      if(response.data.success) {
        form.reset({
          subject: '',
          message: ''
        })
        toast({title: "Query Submitted", description: "Your query has been successfully submitted"});
        if(user && user._id && user.isVerified) setShowDialog(true); 
      } else {
        toast({
          title: "Something Went Wrong", 
          description: "Your query has not been submitted"
        });
      }
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error?.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <section className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-br from-gray-50 to-blue-50" id="contact-us">
      <div className="w-full">
      <div className="space-y-6 m-auto max-w-[100rem] md:w-4/6">
        <div className="px-4 md:px-6 gap-8 pb-4 text-center mb-0 sm:mb-5 md:mb-8 lg:mb-10">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact Us and Ask your query</h2>
          <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
            Help us improve our book selection and services.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 mx-4">
          <div className="flex items-center gap-4 px-4">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-lg">
              <MailIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Contact Us / Book Inquiries</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4 px-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField 
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="name" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}      
                  />
                </div>
                <div>
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
                </div>
              </div>
              <div>
                <FormField 
                      name="subject"
                      control={form.control}
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                  <Input placeholder="subject of your query" {...field}/>
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}      
                />
              </div>
              <div>
                <FormField 
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Share your detailed query" className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                      )}      
                  />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Submit Query')
                  }
                </Button>
              </div>
            </form>
          </Form>
        </div>
        </div>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your query is registered</AlertDialogTitle>
            <AlertDialogDescription>
              You can see your Query ID at <Link href="/queries" className="text-sm text-black font-medium underline transform duration-300 underline-offset-4 hover:font-bold focus:scale-110" >My Queries</Link>. This ID will be required to have follow-ups with our team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>Understood</AlertDialogCancel>
            <AlertDialogAction onClick={(e: any) => { router.push("/queries") }}>
              My Queries
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </section>
  )
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
