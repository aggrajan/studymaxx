"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProductDetails } from "./product-details";
import { TabView } from "./tab-view";
import { Reviews } from "./reviews";
import { OtherProductsYouMayFindUseful } from "./other-products-you-may-find-useful";
import { Book } from "@/model/Books";
import { addItemQuantity, ICartItem, subtractItemQuantity, addCartItem, removeCartItem } from "@/lib/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Badge } from "../ui/badge"
import { useEffect } from "react"
import { useToast } from "../ui/use-toast"
import { Author } from "@/model/Authors"
import { addToWishlist } from "@/app/apiCalls/callAddtoWishlist"
import { removeFromWishlist } from "@/app/apiCalls/removeFromWishlist"
import { addToWishlist as addToWishlistSlice, removeFromWishlist as removeFromWishlistSlice } from "@/lib/slices/authSlice"
import { useRouter } from "next/navigation"
import { Separator } from "../ui/separator"

export function ItemCard({ book } : { book: Book}) {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userPresent, user } = useAppSelector((state) => state.auth);
  const [addedToWishlist, setAddedToWishlist] = useState<boolean>(false);

  function getAuthorNames(authors: Author[] | undefined): string {
    if(authors === undefined) return "";
    return authors.map(author => author.name).filter((name): name is string => name !== undefined).reduce((prev, curr) => (prev + ", " + curr));
  }
  const { toast } = useToast();
  const [addedToCart, setAddedToCart] = useState(false);
  const [count, setCount] = useState(0)
  const cartItem: ICartItem = {
    quantity: 1,
    product: book
  }

  useEffect(() => {
    const countValue = getQuantity();
    if(countValue > 0) {
      setAddedToCart(true);
      setCount(countValue);
    } else {
      setAddedToCart(false);
      setCount(1);
    }

    const isAddedToWishlist = checkIfAddedToWishlist();
    if(isAddedToWishlist) {
      setAddedToWishlist(true);
    } else if(userPresent && user?.wishlist) {
      setAddedToWishlist(
        user.wishlist.findIndex((wishlistBook : Book) => wishlistBook._id === book._id) !== -1
      )
    }
  }, [userPresent, cartItems, book._id, user, user?.wishlist]);

  function getQuantity(): number {
    if(!book) return 0;
    const cartIndex = cartItems.findIndex((cartItem) => cartItem.product._id === book._id);
    if(cartIndex === -1) return 0;
    return cartItems[cartIndex].quantity
  }

  function getTruncatedTitle(title: string): string {
    return title.length > 50 ? title.substring(0, 50) + "..." : title;
  }

  function getDiscountedPrice(originalPrice: number, discount: number): number {
    return ((originalPrice * (100 - discount)) / 100.0)
  }

  function checkIfAddedToWishlist() {
    console.log(user);
    if(!userPresent) return false;
    if(user?.wishlist == null) return false;
    return user?.wishlist.findIndex((wishlistBook: Book) => wishlistBook._id === book._id) !== -1;
  }

  return (
    <Card className="group w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0">
      <Dialog>
        <DialogTrigger asChild>
        <div className="relative overflow-hidden">
          <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <img 
              src={book.image} 
              alt="Book Image" 
              className="w-full h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300 cursor-pointer" 
            />
          </div>
          {book.latest && (
            <div className="absolute -top-2 -right-2 z-10">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                NEW
              </div>
            </div>
          )}
          {book.outOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                Out of Stock
              </div>
            </div>
          )}
        </div>
        </DialogTrigger>
        <DialogContent hideCloseButton={false} className="min-w-[85%] my-16 p-0" onOpenAutoFocus={(e) => {e.preventDefault()}}>          
          <ProductDetails isModal={true} book={book} getAuthors={getAuthorNames} addedToCart={addedToCart} setAddedToCart={setAddedToCart} count={count} setCount={setCount} addedToWishlist={addedToWishlist} setAddedToWishlist={setAddedToWishlist} />
          <TabView about={book.about} salient_features={book.salient_features} useful_for={book.useful_for} additional_support={book.additional_support} />
          <Reviews bookId={book._id as string} />
          <OtherProductsYouMayFindUseful book={book} isModal={true} />
        </DialogContent>
      </Dialog>
      
      <CardContent className="flex flex-col p-4 space-y-3">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="truncate-title text-lg font-bold text-gray-800 min-h-[4rem] leading-tight group-hover:text-blue-600 transition-colors duration-200">
                {book.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-wrap">{book.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        <p className="truncate-text text-sm text-gray-600 min-h-[2.5rem] italic">
          by {getAuthorNames(book.authors)}
        </p>

        <div className="flex flex-col justify-start items-start gap-2 min-h-[4rem]">
            <div className="text-2xl font-bold text-green-600">
              &#8377;{(book && book.discount && (book.discount > 0)) ? getDiscountedPrice(book.price, book.discount).toFixed(0) : book.price.toFixed(0) }
            </div>
            {
              (book && book.discount && (book.discount > 0)) ?
              <div className="flex flex-row items-center gap-2 -mt-1">
                <span className="text-sm font-medium text-gray-500 line-through">
                  &#8377;{book.price.toFixed(0)}
                </span>
                <Badge className="text-xs font-semibold bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 px-2 py-1">
                  {(book.discount).toFixed(0)}% OFF
                </Badge>
              </div>
              : null
            }
        </div>
        
        {!addedToCart && <div className="flex justify-between items-center mt-4 gap-2">
          {userPresent ?
            addedToWishlist ? 
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 transition-colors duration-200">
                  <HeartIconFilled className="w-5 h-5 text-red-500" onClick={async () => { removeFromWishlist(book._id as string); dispatch(removeFromWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Removed from Wishlist", description: "One item has been removed from your wishlist"}) }}/>
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove From Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
              : 
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 transition-colors duration-200">  
                    <HeartIcon className="w-5 h-5 text-gray-400 hover:text-pink-500 transition-colors duration-200" onClick={async () => { addToWishlist(book._id as string); dispatch(addToWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Added to Wishlist", description: "One item has been added to your wishlist"}) }} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
          : null}
          {(userPresent && !addedToCart) && 
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={book.outOfStock} 
                  onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); setAddedToCart((prev) => !prev)}} 
                  className="rounded-full hover:bg-blue-50 transition-colors duration-200"
                >
                  <ShoppingCartIcon className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                  <p>{book.outOfStock ? "Out of Stock" : "Add To Cart"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          }
          {!userPresent && <Button 
            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
            disabled={book.outOfStock} 
            onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); setAddedToCart((prev) => !prev)}} 
          >
              <ShoppingCartIcon className="mr-2 w-4 h-4" /> 
              <span className="text-sm">{book.outOfStock ? "Out of Stock" : "Add to Cart"}</span>
            </Button>}
          {(user && user.isAdmin) ? 
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => { route.push(`/edit-book/${book._id}`) }} className="rounded-full hover:bg-gray-100 transition-colors duration-200">
                  <img src="/edit.svg" className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                  <p>Edit Book</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          : null}
        </div>}
        {addedToCart && <div className="flex items-center justify-between mt-4">
          {userPresent ?
            addedToWishlist ? 
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 transition-colors duration-200">
                  <HeartIconFilled className="w-5 h-5 text-red-500" onClick={async () => { removeFromWishlist(book._id as string); dispatch(removeFromWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Removed from Wishlist", description: "One item has been removed from your wishlist"}) }}/>
                </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove From Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
              : 
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-pink-50 transition-colors duration-200">  
                    <HeartIcon className="w-5 h-5 text-gray-400 hover:text-pink-500 transition-colors duration-200" onClick={async () => { addToWishlist(book._id as string); dispatch(addToWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Added to Wishlist", description: "One item has been added to your wishlist"}) }} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
          : null}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {
              count > 1 ? <Button
                variant="outline"
                size="icon"
                onClick={() => { 
                  if(userPresent) dispatch(subtractItemQuantity({ id: book._id as number})); 
                  setCount((prev) => prev - 1); 
                }}
                disabled={count <= 1}
                className="w-8 h-8 rounded-full border-gray-300 hover:bg-gray-200 transition-colors duration-200"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              : <Button 
                variant="outline" 
                size="icon" 
                onClick={() => { 
                  dispatch(removeCartItem({ id: book._id as number })); 
                  toast({title: "Item Removed", description: "Book(s) successfully removed from your cart"}); 
                 
                  setAddedToCart((prev) => !prev);
                }}
                className="w-8 h-8 rounded-full border-red-300 hover:bg-red-50 text-red-500 transition-colors duration-200"
              >
              <TrashIcon className="h-4 w-4" />
            </Button>
            }
            <span className="mx-3 font-semibold text-gray-700 min-w-[1.5rem] text-center">{count}</span>
            <Button variant="outline" 
              size="icon" 
              onClick={() => { dispatch(addItemQuantity({ id: book._id as number})); setCount((prev) => prev + 1); }}
              className="w-8 h-8 rounded-full border-green-300 hover:bg-green-50 text-green-600 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {(user && user.isAdmin) ? 
          <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => { route.push(`/edit-book/${book._id}`) }} className="rounded-full hover:bg-gray-100 transition-colors duration-200">
                <img src="/edit.svg" className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Edit Book</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
          
          : null}
        </div>}
      </CardContent>
    </Card>
  )
}

function HeartIcon(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HeartIconFilled(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="red"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
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
  );
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
  );
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