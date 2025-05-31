"use client";
import { OrderDetail } from "@/components/component/order-detail-page";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/lib/hooks";
import { Order } from "@/model/Order";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailPage() {
    const [unauthorized, setUnauthorized] = useState(false);
    const params = useParams<{orderId: string}>();
    const orderId = params.orderId;

    const { user, userPresent } = useAppSelector((state) => state.auth);
    

    const [order, setOrder] = useState<Order>();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        
        (async () => {
            try{ 
                const response = await axios.get(`/api/get-order/${user?._id}/${orderId}`);
                if(response.status === 200) {
                    const currentOrder = response.data.response;
                    if(currentOrder.user !== user?._id) {
                        setUnauthorized(true);
                    } else {
                        setOrder(response.data.response);
                    }
                }
            } catch(error: any) {
                setUnauthorized(true); 
            } finally {
                setIsMounted(true);
            }
            
        })();
    }, [orderId, user?._id]);

    if(unauthorized) return <div className='h-screen w-screen flex justify-center items-center'>
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold tracking-tighter sm:text-3xl md:text-5xl mb-4">Unauthorized Access Denied!</h1>
      <Link href="/" className="text-blue-500 hover:text-blue-700 hover:underline underline-offset-2">Visit Home?</Link>
    </div>
  </div>

    if(!isMounted || !userPresent) return <div className="mt-[55px] w-screen h-screen flex justify-center items-center text-xl font-semibold tracking-tighter sm:text-2xl bg-gray-100">
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
                    <BreadcrumbLink href="/all-orders">Your Orders</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Order Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <OrderDetail order={order} />
    </>;
}