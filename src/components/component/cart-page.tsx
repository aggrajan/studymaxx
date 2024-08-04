"use client"

import { useToast } from "../ui/use-toast"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { Author } from "@/model/Authors"
import { addItemQuantity, subtractItemQuantity, removeCartItem } from "@/lib/slices/cartSlice"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"


export function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cartCount, cartItems, shipping, discount, total, subtotal } = useAppSelector((state) => state.cart);
  const { toast } = useToast();
  function getAuthors(authors: Author[] | undefined): string {
    if(authors ===  undefined) return "";
    const authorsName = authors.map((author) => author.name)
    return authorsName.join(", ");
  }
  function getDiscountedPrice(originalPrice: number, discount: number): number {
    return (originalPrice * (100 - discount)) / 100.0;
  }
  return (
      <main className="flex-1 py-12 px-2 md:px-4">
        <div className="container mx-auto grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="grid gap-6">
              {cartCount > 0 ? cartItems.map((item) => (
                <div key={item.product._id as string} className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    width={100}
                    height={150}
                    className="object-cover cursor-pointer"
                    onClick={() => {router.push(`/products/${item.product._id}`)}}
                  />
                  <div onClick={() => {router.push(`/products/${item.product._id}`)}} className="cursor-pointer">
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-muted-foreground">{getAuthors(item.product.authors)}</p>
                    <div className="flex justify-start items-center gap-4">
                      {(item.product && item.product.discount && (item.product.discount > 0)) ? <div className="text-md md:text-lg font-semibold text-primary">&#8377;{getDiscountedPrice(item.product.price, item.product.discount)}</div> : null}
                      <div className={`${(item.product && item.product.discount && (item.product.discount > 0)) ? "text-sm md:text-md font-semibold text-muted-foreground line-through": "text-md md:text-lg font-semibold text-primary"}`}>&#8377;{item.product.price}</div>
                      {(item.product && item.product.discount && (item.product.discount > 0)) ? <Badge variant="default" className="text-xs scale-75 md:scale-90 lg:scale-100">
                        {(item.product.discount).toFixed(1)}% OFF
                      </Badge> : null}
                    </div>
                  </div>
                  <div className="flex items-center flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => { dispatch(subtractItemQuantity({ id: item.product._id as number})) }}
                        disabled={item.quantity === 1}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => {dispatch(addItemQuantity({ id: item.product._id as number})) }}>
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => { dispatch(removeCartItem({ id: item.product._id as number })); toast({title: "Item Removed", description: "Book(s) successfully removed from your cart"})}}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )) : <div className="flex justify-center items-center">Your cart is empty</div>}
            </div>
          </div>
          <div className="bg-muted p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>&#8377;{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>&#8377;{cartCount > 0 ? shipping.toFixed(2): 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-&#8377;{cartCount > 0 ? discount.toFixed(2) : 0}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>&#8377;{(total).toFixed(2)}</span>
              </div>
            </div>
            <Button className={`w-full mt-6 ${cartCount > 0 ? "cursor-pointer" : "cursor-not-allowed"}`} disabled={cartCount === 0}>Proceed to Checkout</Button>
          </div>
        </div>
      </main>
  )
}

function BookIcon(props: any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function MinusIcon(props: any) {
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
    </svg>
  )
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


function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
