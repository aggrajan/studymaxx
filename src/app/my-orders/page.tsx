"use client";
import { OrdersPage } from "@/components/component/orders-page";
import { useAppSelector } from "@/lib/hooks";
import { LoaderCircle } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function MyOrdersPage() {
    const { user, userPresent } = useAppSelector((state) => state.auth);
    if(!userPresent) return <div className="mt-[55px] w-screen h-screen flex justify-center items-center text-xl font-semibold tracking-tighter sm:text-2xl bg-gray-100">
                            <LoaderCircle className="mr-2 h-7 w-7 duration-200 animate-spin"/> Loading...
                        </div>;
    return <>
        <Breadcrumb className="px-4 lg:px-6 pt-16 bg-gray-100">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Your Orders</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <OrdersPage api={`/api/get-order/${user?._id}`} pageLocation="my-orders" />
    </>
}