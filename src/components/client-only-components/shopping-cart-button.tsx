"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Author } from "@/model/Authors";
import { Separator } from "../ui/separator";

export function ShoppingCartButton() {
    const router = useRouter();
    const { cartCount, cartItems } = useAppSelector((state) => state.cart);
    function getAuthors(authors: Author[] | undefined): string {
      if(authors ===  undefined) return "";
      const authorsName = authors.map((author) => author.name)
      return authorsName.join(", ");
    }
    function getDiscountedPrice(originalPrice: number, discount: number): number {
      return (originalPrice * (100 - discount)) / 100.0;
    }

    function getTruncatedTitle(title: string): string {
      return title.length > 50 ? title.substring(0, 50) + "..." : title;
    }

    return ( <>
      <div className="hidden sm:block">
      <HoverCard openDelay={400}>
        <HoverCardTrigger asChild>
          <div className="relative">
              <Button onClick={(e) => { e.preventDefault(); router.push('/cart') }} variant="ghost" size="icon" className="rounded-full text-white">
                  <ShoppingCartIcon className="h-5 w-5 " />
                  <span className="sr-only">Shopping Cart</span>
              </Button>
              {cartCount > 0 && (
                  <Badge className="bg-primary text-primary-foreground w-5 h-5 flex justify-center items-center absolute top-2 right-0 transform translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={(e) => { e.preventDefault(); router.push('/cart') }}>
                      {cartCount}
                  </Badge>
              )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="mr-5 min-w-[25rem] max-h-60 overflow-y-auto">
          <div className="flex flex-col gap-y-4 w-full">
            {(cartCount > 0) ? cartItems.map((item, index) => (
              <div key={`hover_cart_element_${index}`} className="relative flex flex-row justify-start items-center gap-x-2 w-full">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    width={80}
                    height={100}
                    className="object-cover cursor-pointer"
                    onClick={() => {router.push(`/products/${item.product._id}`)}}
                  />
                <div onClick={() => {router.push(`/products/${item.product._id}`)}} className="cursor-pointer w-full">
                  <h3 className="truncate-text font-semibold text-md w-full">{(item.product.title)}</h3>
                  <Separator className="w-full mt-2 mb-1" />
                  <p className="truncate-text text-muted-foreground text-xs w-full">{getAuthors(item.product.authors)}</p>
                  <div className="flex justify-start items-center gap-2">
                    {(item.product && item.product.discount && (item.product.discount > 0)) ? <div className="text-md md:text-lg font-semibold text-primary">&#8377;{getDiscountedPrice(item.product.price, item.product.discount).toFixed(0)}</div> : null}
                    <div className={`${(item.product && item.product.discount && (item.product.discount > 0)) ? "text-xs md:text-sm font-semibold text-muted-foreground line-through": "text-md md:text-lg font-semibold text-primary"}`}>&#8377;{item.product.price.toFixed(0)}</div>
                    {(item.product && item.product.discount && (item.product.discount > 0)) ? <Badge variant="default" className="text-xs scale-[55%] md:scale-75 lg:scale-75 -ml-2 text-black bg-gray-300 hover:bg-gray-600 hover:text-white">
                      {(item.product.discount).toFixed(0)}% OFF
                    </Badge> : null}
                    <Badge className="text-md scale-[55%] md:scale-75 lg:scale-75 -ml-4 text-black bg-gray-300 hover:bg-gray-600 hover:text-white">Qty: {item.quantity}</Badge>
                  </div>
                </div>
              </div>
            ))

             : <div className="flex justify-center items-center">
              Your cart is empty
            </div>}
            <Button onClick={() => { router.push("/cart") }} className="bg-blue-700 hover:bg-blue-800">
              Go to Cart
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
      </div>

      {/* Show button without HoverCard on smaller screens */}
      <div className="block sm:hidden">
      <div className="relative">
              <Button onClick={(e) => { e.preventDefault(); router.push('/cart') }} variant="ghost" size="icon" className="rounded-full text-white bg-blue-700">
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
      </div>
      </>
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
