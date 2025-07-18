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
        userId: user ? user._id : undefined,
        name: user ? user.name : '',
        email: user ? user.email : '',
        book: '',
        feedback: ''
      }
  });

  const onSubmit = async (data: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`, data);
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
    <section className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-pattern.webp')] opacity-10"></div>
      <div className="relative w-full overflow-hidden z-10">
        
        <div className="space-y-6 mx-auto max-w-[100rem] md:w-4/6 z-10">
          <div className="px-4 md:px-6 gap-8 pb-4 text-center mb-0 sm:mb-5 md:mb-8 lg:mb-10">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Give us your feedback</h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto">
              Help us improve our book selection and services.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mx-4">
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
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
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Submit Feedback')
                }
            </Button>
            </div>
          </form>
          </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
