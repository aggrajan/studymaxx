"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "../ui/button"
import { Order } from "@/model/Order"
import axios from "axios"
import { useAppSelector } from "@/lib/hooks"
import { SkeletonOrders } from "../skeleton-components/skeleton-orders"
import Link from "next/link"
import { useToast } from "../ui/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function OrdersPage( { api, pageLocation } : { api : string, pageLocation: string } ) {
  const [errorMessage, setErrorMessage] = useState("No Orders Found!");
  const router = useRouter();
  const { toast } = useToast();
  const { user, userPresent } = useAppSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedStatusToChange, setSelectedStatusToChange] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  })
  const [orders, setOrders] = useState<Order[]>([]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order?._id?.toLowerCase().includes(searchTerm.toLowerCase()) || order?.createdAt?.toString().slice(0, 10).includes(searchTerm) || order?.total.toString().includes(searchTerm);
      const matchesStatus = selectedStatus === "all" || order.orderStatus.toLowerCase() === selectedStatus
      const matchesDateRange =
        (!selectedDateRange.startDate || new Date(order?.createdAt ? order.createdAt : Date.now()) >= new Date(selectedDateRange.startDate)) &&
        (!selectedDateRange.endDate || new Date(order?.createdAt ? order.createdAt : Date.now()) <= new Date(selectedDateRange.endDate))
      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [searchTerm, selectedStatus, selectedDateRange, orders]);

  useEffect(() => {
    
    (async () => {
      const response = await axios.get(api);
      if(response.status === 200) {
        setOrders(response.data.response);
        
        const changeStatusArray = [];
        for(let i = 0; i < response.data.response.length; ++i) {
          changeStatusArray[i] = "";
        }

        setSelectedStatusToChange(changeStatusArray);
      } else {
        setErrorMessage("You are not authorized to view this page");
      }
      setIsMounted(true);
    })();
  }, [api]);

  const onDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/delete-order`, { id: id });
      if(response.status === 200) {
        toast({ title: "Order deleted successfully", description: "You have successfully delete an order from database" });
        router.refresh();
      } else {
        toast({
            title: "Error Occured",
            description: "There might be some issue with the data provided",
            variant: "destructive"
        });
        router.refresh();
      }
    } catch(error: any) {
      toast({
          title: "Error Occured",
          description: error.message,
          variant: "destructive"
      });
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  }

  const onChangeOrderStatus = async (id: string, status: string) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/change-order-status`, { id: id, orderStatus: status });
      if(response.status === 200) {
        toast({ title: "Order status changed successfully", description: "You have successfully changed an order's status from database" });
        router.refresh();
      } else {
        toast({
            title: "Error Occured",
            description: "There might be some issue with the data provided",
            variant: "destructive"
        });
        router.refresh();
      }
    } catch (error: any) {
      toast({
          title: "Error Occured",
          description: error.message,
          variant: "destructive"
      });
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  }

  if(!isMounted || !userPresent) return <SkeletonOrders></SkeletonOrders>

  return (
    (orders.length > 0 && userPresent) ? 
    <div className="w-full bg-gray-100">
      <div className="mx-auto max-w-[100rem] px-4 md:px-6 py-8 pt-[55px]">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Orders</h1>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Input placeholder="Search orders by id, date (yyyy-mm-dd), cart amount" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div>
          <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Placed">Placed</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="On The Way">On The Way</SelectItem>
              <SelectItem value="Returned">Returned</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredOrders.length > 0 ? filteredOrders.map((order: Order, index: number) => (
          <Card key={order._id} className="rounded-sm">
            <CardHeader>
              <CardTitle>Order #{order._id}</CardTitle>
              <CardDescription>
                <div className="font-bold">{order?.createdAt?.toString().slice(0, 10) || ""}</div>
                <div>{order.name}</div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span>&#8377;{order.total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Order Status:</span>
                  <span
                    className={`font-medium ${
                      order.orderStatus === "Placed"
                        ? "text-yellow-500"
                        : order.orderStatus === "Shipped"
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <Button className="mt-4 bg-blue-700 hover:bg-blue-800" disabled={isSubmitting} onClick={() => router.push(`/${pageLocation}/${order._id}`)}>
                  {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('View Order')
                  }
                </Button>
                {userPresent && user?.isAdmin && 
                <Button disabled={isSubmitting} variant="destructive" className="mt-4" onClick={() => {
                  onDelete(order._id || "");
                }}>
                  {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Delete Order')
                  }
                </Button>}
              </div>
              {userPresent && user?.isAdmin && <div className="grid grid-cols-1 mt-4 gap-2">
              <Select value={selectedStatusToChange[index]} onValueChange={(value) => {
                const changeStatusArray = [...selectedStatusToChange];
                changeStatusArray[index] = value;
                setSelectedStatusToChange(changeStatusArray);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selete Status to update" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Placed">Placed</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="On The Way">On The Way</SelectItem>
                  <SelectItem value="Returned">Returned</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
                <Button disabled={isSubmitting} className="w-fit mx-auto text-black hover:text-white bg-white hover:bg-gray-600 border border-black" onClick={() => {
                  onChangeOrderStatus(order._id || "", selectedStatusToChange[index]);
                }}>
                {
                    isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</>) : ('Change Status')
                }
                </Button>
              </div>}
            </CardContent>
          </Card>
        )) : <div className='h-full w-full flex justify-center items-center'>
              <h1 className="text-xl font-bold tracking-tighter sm:text-xl md:text-3xl mb-4">No Orders Found!</h1>
            </div>
          }
      </div>
      </div>
    </div> : <div className='h-screen w-screen flex justify-center items-center bg-gray-100'>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{errorMessage}</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-700 hover:underline underline-offset-2">Visit Home?</Link>
      </div>
    </div>
  )
}
