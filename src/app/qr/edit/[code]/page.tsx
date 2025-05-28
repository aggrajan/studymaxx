import getQRbyCode from "@/app/apiCalls/callQR";
import { notFound } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import EditQRPage from "@/components/client-only-components/qr-edit-form";


export default async function QRPage({ params }: { params: { code: string } }) {
    const qr = await getQRbyCode(params.code);
    if (!qr) {
        notFound();
    }

    return <><Breadcrumb className="px-4 lg:px-6 pt-16 pb-2 bg-gray-100">
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/qr/view">QR</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Edit</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
        <EditQRPage qrCode={qr} />
    </>
}