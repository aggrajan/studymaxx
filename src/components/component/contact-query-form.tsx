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
  AlertDialogTrigger,
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
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof querySchema>>({
      resolver: zodResolver(querySchema),
      defaultValues: {
        userId: user ? user._id : "",
        name: user ? user.name : '',
        email: user ? user.email : '',
        subject: '',
        message: ''
      }
  });

  const onSubmit = async (data: z.infer<typeof querySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/query`, data);
      if(response.data.success) {
        form.reset({
          userId: user ? user._id : "",
          name: user ? user.name : '',
          email: user ? user.email : '',
          subject: '',
          message: ''
        })
        toast({title: "Query Submitted", description: "Your query has been successfully submitted"});
      } else {
        toast({title: "Something Went Wrong", description: "Your query has not submitted"});
      }
    } catch(error: any) {
      toast({title: "Something Went Wrong", description: "You might not have logged in"});
    }
    setIsSubmitting(false);
  }
  return (
    <section className="m-auto w-full sm:w-full md:w-3/4 lg:w-2/3 px-4 pt-12 md:pt-24 lg:pt-32" id="contact-us">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">Contact Us and Ask your query</h2>
          <p className="text-muted-foreground">Help us improve our book selection and services.</p>
        </div>
        <div className="rounded-md border bg-background p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-primary p-3 text-primary-foreground">
              <MailIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Contact Us / Book Inquiries</h3>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
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
              <AlertDialog>
              <AlertDialogTrigger>
                <Button type="submit" disabled={isSubmitting}>
                  {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Submit Query')
                  }
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Your query is registered</AlertDialogTitle>
                <AlertDialogDescription>
                  You can see your Query ID at <Link href="/queries" className="text-sm text-black font-medium underline transform duration-300 underline-offset-4 hover:font-bold focus:scale-110" >My Queries</Link>. This ID will be required to have follow-ups with our team.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Understood</AlertDialogCancel>
                <AlertDialogAction onClick={(e: any) => { router.push("/queries") }}>
                  My Queries
                </AlertDialogAction>
              </AlertDialogFooter>
              </AlertDialogContent>
              </AlertDialog>
              </div>
            </form>
          </Form>
        </div>
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
