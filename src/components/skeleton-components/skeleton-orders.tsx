"use client";

import { Skeleton } from "../ui/skeleton";
export function SkeletonOrders() {
    return <><div className="w-full bg-gray-100">
    <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-8 mt-[55px]">
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Orders</h1>
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <Skeleton className="w-full h-10" />
      </div>
      <div>
        <div className="w-full" />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
    </div>
    </div>
  </div></>
}