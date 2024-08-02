"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export function ShoppingCartButton() {
    const router = useRouter();
    const cartCount = useAppSelector((state) => state.cart.cartCount)

    return (
      <div className="relative">
            <Button onClick={(e) => { e.preventDefault(); router.push('/cart') }} variant="ghost" size="icon" className="rounded-full">
                <ShoppingCartIcon className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
            </Button>
            {cartCount > 0 && (
                <Badge className="bg-primary text-primary-foreground w-5 h-5 flex justify-center items-center absolute top-2 right-0 transform translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={(e) => { e.preventDefault(); router.push('/cart') }}>
                    {cartCount}
                </Badge>
            )}
        </div>
    );
}


function ShoppingCartIcon(props: any) {
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
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    )
  }
  