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
import { Loader2, MessageSquare, Star, Send } from "lucide-react";

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
    <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative w-full overflow-hidden z-10">
        <div className="space-y-8 mx-auto max-w-4xl px-4 md:px-6">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Give us your feedback
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="max-w-2xl text-gray-600 md:text-xl mx-auto font-medium">
              Help us improve our book selection and services with your valuable insights.
            </p>
          </div>

          {/* Form Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Share Your Experience</h3>
                  <p className="text-gray-600">Your feedback helps us serve you better</p>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField 
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  Name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                      placeholder="Enter your full name" 
                                      {...field}
                                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200"
                                    />
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
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  Email
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                      placeholder="Enter your email address" 
                                      {...field}
                                      className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}      
                    />
                  </div>

                  <FormField 
                      name="book"
                      control={form.control}
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Book Name (Optional)
                              </FormLabel>
                              <FormControl>
                                  <Input 
                                    placeholder="Which book is this feedback about?" 
                                    {...field}
                                    className="border-2 border-gray-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200"
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}      
                  />

                  <FormField 
                        name="feedback"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  Your Feedback
                                </FormLabel>
                                <FormControl>
                                <Textarea 
                                  placeholder="Share your thoughts, suggestions, or experiences with us..." 
                                  className="min-h-[140px] border-2 border-gray-200 focus:border-blue-500 rounded-xl resize-none transition-all duration-200" 
                                  {...field} 
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}      
                    />
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5"/>
                          Submit Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}