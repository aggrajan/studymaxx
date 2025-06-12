"use client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { QRFormSchema } from "@/schemas/addQRcodeSchema";
import { generateCode } from "@/helpers/getCodeGererated";


export function QRSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof QRFormSchema>>({
      resolver: zodResolver(QRFormSchema),
      defaultValues: {
        code: generateCode()
      }
  });

  const onSubmit = async (data: z.infer<typeof QRFormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/qr`, data);
      if(response.data.success) {
        form.reset({
          code: '',
          url: ''
        })
        toast({title: "QR Submitted Successfully", description: "Your QR code has been successfully submitted"});
      } else {
        toast({title: "Something Went Wrong", description: "Your QR code has not submitted", variant: "destructive"});
      }
    } catch(error: any) {
      toast({title: "Something Went Wrong", description: "You might not have logged in", variant: "destructive"});
    }
    setIsSubmitting(false);
  }
  return (
    <div className="bg-gray-100">
        <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
        
        <div className="space-y-6 z-10">
          <div className="px-4 md:px-6 gap-8 pb-4 text-center mb-0 sm:mb-5 md:mb-8 lg:mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Generate your QR here</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
              Provide a link for your uploaded PDF here to generate a QR code for the same
            </p>
          </div>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <FormField 
                    name="url"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input placeholder="url" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}      
                />
              </div>
            </div>
            <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="bg-blue-700 hover:bg-blue-800">
                {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Submit URL')
                }
            </Button>
            </div>
          </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
