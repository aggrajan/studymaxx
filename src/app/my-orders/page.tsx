"use client";
import { OrdersPage } from "@/components/component/orders-page";
import { useAppSelector } from "@/lib/hooks";
import { LoaderCircle } from "lucide-react";

export default function MyOrdersPage() {
    const { user, userPresent } = useAppSelector((state) => state.auth);
    if(!userPresent) return <div className="mt-[55px] w-screen h-screen flex justify-center items-center text-xl font-semibold tracking-tighter sm:text-2xl bg-gray-100">
                            <LoaderCircle className="mr-2 h-7 w-7 duration-200 animate-spin"/> Loading...
                        </div>;
    return <>
        <OrdersPage api={`/api/get-orders/${user?._id}`} />
    </>
}