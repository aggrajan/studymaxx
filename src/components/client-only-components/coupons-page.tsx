"use client";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import getCoupons from "@/app/apiCalls/callCoupons";
import { SkeletonCoupons } from "../skeleton-components/skeleton-coupons";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";

export function CouponsPage() {
    const router = useRouter();
    const { userPresent, user } = useAppSelector((state) => state.auth);
    const [coupons, setCoupons] = useState([]);
    const [couponConfig, setCouponConfig] = useState(false);
    useEffect(() => {
        const getAllCoupons = async () => {
            const allCoupons = await getCoupons();
            setCoupons(allCoupons);
            setCouponConfig(true);
        }
        
        if(userPresent) getAllCoupons();
    }, []);

    return <>
        {(couponConfig) ? 
        ((userPresent && user && coupons.length > 0) ? <section className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="container px-4 md:px-6 gap-8 pb-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Coupons</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    See all available coupons
                </p>
            </div>
            <div className="container px-4 md:px-6 gap-8 pb-4">
            <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="w-8 h-8 flex justify-center items-center" onClick={() => router.push("/add-coupon")}>
                    <PlusIcon className="w-7 h-7" />
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                <p>Add another coupon</p>
              </TooltipContent>
            </Tooltip>
            </TooltipProvider>
            </div>
            <div className="container px-4 md:px-6">
            <Table>
                <TableCaption>A list of all your added coupons</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Coupon ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Validity</TableHead>
                    <TableHead>Minimum Amount</TableHead>
                    <TableHead className="text-right">Description</TableHead>
                    </TableRow>
                </TableHeader>
                {
                    coupons.map((coupon: { _id: string, couponName: string, couponDescription: string, couponValue: number, couponType: string, minimumAmount: number, lastValidityDate: string }, index: number) => {
                        return <TableBody key={`every_coupon_${index}`}>
                            <TableRow>
                                <TableCell className="font-medium w-[100px]">{coupon._id}</TableCell>
                                <TableCell>{coupon.couponName}</TableCell>
                                <TableCell>{coupon.couponValue}</TableCell>
                                <TableCell>{coupon.couponType}</TableCell>
                                <TableCell>{coupon.lastValidityDate.slice(0, 10)}</TableCell>
                                <TableCell>{coupon.minimumAmount}</TableCell>
                                <TableCell className="text-right">{coupon.couponDescription}</TableCell>
                                <TableCell>
                                <TooltipProvider>
                                    <Tooltip delayDuration={200}>
                                        <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="w-6 h-6 flex justify-center items-center border-0 shadow-none bg-inherit hover:bg-inherit" onClick={() => router.push(`/edit-coupon/${coupon._id}`)}>
                                            <img src="/edit.svg" className="w-7 h-7" />
                                        </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                        <p>Edit coupon</p>
                                    </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    })
                }
            </Table>

            </div>
        </section> : <div className="h-full w-full flex justify-center items-center min-h-screen ">
            You have not submitted any coupons yet!
        </div>) 
        : <SkeletonCoupons />
        }
    </>
}

function PlusIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }