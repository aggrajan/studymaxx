import getQRbyCode from "@/app/apiCalls/callQR";
import { notFound, redirect } from "next/navigation";

export default async function QRPage({ params }: { params: { code: string } }) {
    const qr = await getQRbyCode(params.code);
    if (!qr) {
        notFound();
    }

    redirect(qr.url);
}