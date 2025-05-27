"use client"

import { useRef } from "react"
import { Download, Edit, Copy, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { QRCode } from "@/context/QRProvider"
import { useState } from "react"
import { format } from "date-fns"
import { QRCodeSVG } from "qrcode.react"
import { useRouter } from "next/navigation"

export default function QRCodeInfoPage({ qrData } : { qrData: QRCode }) {
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const router = useRouter();

    const getUrl = (code: string) => `${process.env.NEXT_PUBLIC_BASE_URL}/qr/fetch/${code}`
    const qrRef = useRef<SVGSVGElement>(null)

  const handleDownload = () => {
    const svg = qrRef.current

    if (!svg) {
        console.error("SVG element not found")
        return
    }

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)

    const blob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `qr-code-${qrData.code}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    }

  const handleEdit = () => {
    router.push(`/qr/edit/${qrData.code}`);
  }

  const copyToClipboard = async (text: string) => {
     try {
      await navigator.clipboard.writeText(text)
      setCopiedId(qrData._id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  return (
    <div className="mx-auto px-4 sm:px-6 py-6 max-w-4xl w-full overflow-x-hidden">
        <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">QR Code Details</h1>
            <p className="text-muted-foreground">View and manage your QR code information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            {/* QR Code Image Section */}
            <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                QR Code Image
                <Badge variant={"default"}>Active</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                <QRCodeSVG value={getUrl(qrData.code)} size={256} ref={qrRef} />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button onClick={handleDownload} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                </Button>
                <Button onClick={handleEdit} variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                </Button>
                </div>
            </CardContent>
            </Card>

            {/* QR Code Information */}
            <Card className="w-full overflow-x-auto">
            <CardHeader>
                <CardTitle>QR Code Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* QR Code ID */}
                <div>
                <label className="text-sm font-medium text-muted-foreground">QR Code ID</label>
                <div className="flex items-center justify-between mt-1 gap-2">
                    <span className="font-mono text-sm break-all">{qrData.code}</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(qrData.code)}>
                    {copiedId === `url-${qrData._id}` ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                    </Button>
                </div>
                </div>

                <Separator />

                {/* Original URL */}
                <div>
                <label className="text-sm font-medium text-muted-foreground">Original URL</label>
                <div className="flex items-center justify-between mt-1 gap-2">
                    <span className="text-sm truncate font-mono flex-1" title={getUrl(qrData.code)}>
                    {getUrl(qrData.code)}
                    </span>
                    <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(qrData.url)}>
                        <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => window.open(qrData.url, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                </div>

                {/* Redirected URL */}
                <div>
                <label className="text-sm font-medium text-muted-foreground">Redirected URL</label>
                <div className="flex items-center justify-between mt-1 gap-2">
                    <span className="text-sm truncate font-mono flex-1" title={qrData.url}>{qrData.url}</span>
                    <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(qrData.url)}>
                        <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => window.open(qrData.url, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Created At</label>
                    <p className="text-sm mt-1">{format(new Date(qrData.createdAt), "PPP")}</p>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
    </div>

  )
}
