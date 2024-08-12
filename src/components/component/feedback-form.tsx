"use client";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { feedbackSchema } from "@/schemas/feedbackSchema";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";


export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAppSelector((state) => state.auth)

  const form = useForm<z.infer<typeof feedbackSchema>>({
      resolver: zodResolver(feedbackSchema),
      defaultValues: {
        userId: user ? user._id : "",
        name: user ? user.name : '',
        email: user ? user.email : '',
        book: '',
        feedback: ''
      }
  });

  const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/feedback`, data);
      if(response.data.success) {
        form.reset({
          userId: user ? user._id : "",
          name: '',
          email: '',
          book: '',
          feedback: ''
        })
        toast({title: "Feedback Submitted", description: "Your feedback has been successfully submitted"});
      } else {
        toast({title: "Something Went Wrong", description: "Your feedback has not submitted"});
      }
    } catch(error: any) {
      toast({title: "Something Went Wrong", description: "You might not have logged in"});
    }
    setIsSubmitting(false);
  }
  return (
    <section className="m-auto container max-w-[100rem] sm:w-5/6 pt-12 md:pt-24 lg:pt-32">
      <div className="">
        <div className="space-y-6">
          <div className="px-4 md:px-6 gap-8 pb-4 text-center mb-0 sm:mb-5 md:mb-8 lg:mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Give us your feedback</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
              Help us improve our book selection and services.
            </p>
          </div>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <FormField 
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
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

            <div className="grid gap-2">
              <div>
              <FormField 
                  name="book"
                  control={form.control}
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Book</FormLabel>
                          <FormControl>
                              <Input placeholder="book name" {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}      
              />
              </div>
            </div>

            <div className="grid gap-2">
              <FormField 
                    name="feedback"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Feedback</FormLabel>
                            <FormControl>
                            <Textarea placeholder="Share your thoughts and suggestions" className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}      
                />
              
            </div>
            <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
                {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Submit Feedback')
                }
            </Button>
            </div>
          </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
