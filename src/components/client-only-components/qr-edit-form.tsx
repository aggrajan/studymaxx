"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { QRCode } from "@/context/QRProvider"

const EditQRSchema = z.object({
  code: z.string(),
  url: z.string().url("Please enter a valid URL"),
})

export default function EditQRPage({ qrCode } : {qrCode: QRCode}) {
  const router = useRouter()
  const { toast } = useToast()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<z.infer<typeof EditQRSchema>>({
    resolver: zodResolver(EditQRSchema),
    defaultValues: {
      code: qrCode.code as string,
      url: "",
    },
  })

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await axios.get(`/api/qr/code/${qrCode.code}`)
        if (res.data?.response) {
          form.setValue("code", res.data.response.code)
          form.setValue("url", res.data.response.url)
        } else {
          toast({
            title: "QR Not Found",
            description: "No QR code found for this code.",
            variant: "destructive",
          })
          router.push("/")
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch QR code.",
          variant: "destructive",
        })
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchQR()
  }, [qrCode])

  const onSubmit = async (data: z.infer<typeof EditQRSchema>) => {
    setSubmitting(true)
    try {
      const res = await axios.post(`/api/qr/code/${qrCode.code}`, { code: data.code, url: data.url })
      if (res.data.success) {
        toast({
          title: "Updated Successfully",
          description: "QR code URL updated.",
        })
        router.push("/qr/view") // Change to your list/overview page
      } else {
        toast({
          title: "Update Failed",
          description: "Could not update the QR code.",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update QR code.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-gray-100 flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit QR Code</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-700 hover:bg-blue-800"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
