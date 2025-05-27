"use client"

import { useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Edit, Eye, Copy, Check, LoaderCircle } from "lucide-react"
import { format } from "date-fns"
import { QRCodeSVG } from "qrcode.react"
import { useQRContext } from "@/context/QRProvider"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import QRCodeInfoPage from "./qr-code-info-page"
import { useRouter } from "next/navigation"

export default function QRList() {
  const router = useRouter();
  const { qrCodes, loading } = useQRContext()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const getUrl = (code: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/qr/fetch/${code}`

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const handleOpen = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleEdit = (qrCode: { code: string }) => {
    router.push(`/qr/edit/${qrCode.code}`);
  }

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center text-xl font-semibold tracking-tighter sm:text-2xl bg-gray-100">
        <LoaderCircle className="mr-2 h-7 w-7 duration-200 animate-spin" /> Loading...
      </div>
    )

  return (
    <div className="mx-auto p-6 space-y-6 bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">QR Code Management</CardTitle>
          <p className="text-muted-foreground">Manage your QR codes, track clicks, and monitor redirects</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">QR Code</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Redirect URL</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qrCodes?.map((qrCode) => (
                  <TableRow key={qrCode._id} className="hover:bg-muted/50">
                    <TableCell>
                      <QRCodeSVG value={getUrl(qrCode.code)} size={128} />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className="font-mono bg-gray-200 rounded-md border-black">
                          {qrCode.code}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Created: {format(new Date(qrCode.createdAt), "PPP")}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate max-w-[200px]" title={getUrl(qrCode.code)}>
                          {getUrl(qrCode.code)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyUrl(getUrl(qrCode.code), `url-${qrCode._id}`)}
                        >
                          {copiedId === `url-${qrCode._id}` ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm truncate max-w-[200px]" title={qrCode.url}>
                          {qrCode.url}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyUrl(qrCode.url, `redirect-${qrCode._id}`)}
                        >
                          {copiedId === `redirect-${qrCode._id}` ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleOpen(qrCode.url)}
                          title="Open redirect URL"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                title="View QR Code"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                          </DialogTrigger>
                          <DialogContent hideCloseButton={false} className="min-w-[85%] my-16 p-0" onOpenAutoFocus={(e) => {e.preventDefault()}}>
                            <QRCodeInfoPage qrData={qrCode} />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(qrCode)}
                          title="Edit QR code"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
