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
import { Loader2, MessageSquare, Send, User, Mail, FileText, MessageCircle } from "lucide-react";
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
    <section className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden" id="contact-us">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative w-full overflow-hidden z-10">
        <div className="space-y-8 mx-auto max-w-4xl px-4 md:px-6">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Contact Us & Ask Your Query
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
            <p className="max-w-2xl text-slate-600 md:text-xl mx-auto font-medium leading-relaxed">
              Help us improve our book selection and services with your valuable insights and questions.
            </p>
          </div>

          {/* Form Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Get in Touch</h3>
                  <p className="text-slate-600">We'd love to hear from you</p>
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
                                <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                                  <User className="w-4 h-4 text-blue-500" />
                                  Name
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                      placeholder="Enter your full name" 
                                      {...field}
                                      className="border-2 border-slate-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200 bg-white/80"
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
                                <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-indigo-500" />
                                  Email
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                      placeholder="Enter your email address" 
                                      {...field}
                                      className="border-2 border-slate-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200 bg-white/80"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}      
                    />
                  </div>

                  <FormField 
                      name="subject"
                      control={form.control}
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-green-500" />
                                Subject
                              </FormLabel>
                              <FormControl>
                                  <Input 
                                    placeholder="What is your query about?" 
                                    {...field}
                                    className="border-2 border-slate-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200 bg-white/80"
                                  />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}      
                  />

                  <FormField 
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                                  <MessageCircle className="w-4 h-4 text-orange-500" />
                                  Message
                                </FormLabel>
                                <FormControl>
                                <Textarea 
                                  placeholder="Share your detailed query or feedback..." 
                                  className="min-h-[140px] border-2 border-slate-200 focus:border-blue-500 rounded-xl resize-none transition-all duration-200 bg-white/80" 
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
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5"/>
                          Submit Query
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

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="rounded-2xl border-0 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-slate-800">Query Registered Successfully</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              You can view your Query ID at <Link href="/queries" className="text-blue-600 font-medium underline transform duration-300 underline-offset-4 hover:text-blue-700" >My Queries</Link>. This ID will be required for follow-ups with our team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)} className="rounded-xl">Understood</AlertDialogCancel>
            <AlertDialogAction onClick={(e: any) => { router.push("/queries") }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl">
              My Queries
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}