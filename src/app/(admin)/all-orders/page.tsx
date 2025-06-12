"use client";
import { OrdersPage } from "@/components/component/orders-page";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AllOrdersPage() {
    return <>
        <Breadcrumb className="px-4 lg:px-6 pt-16 bg-gray-100">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>All Orders</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <OrdersPage api={`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-orders`} pageLocation="all-orders" />
        </>;
}