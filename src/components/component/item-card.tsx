"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
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
import { Review } from "@/model/Review"
import { getReviews } from "@/app/apiCalls/callReviews"
import { Separator } from "../ui/separator"

export function ItemCard({ book } : { book: Book}) {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userPresent, user } = useAppSelector((state) => state.auth);
  const [addedToWishlist, setAddedToWishlist] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([])

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
    }
  }, [userPresent]);

  useEffect(() => {
    (async () => {
      const currentReviews: Review[] = await getReviews(book._id as string);
      setReviews(currentReviews);
    })();
  }, [])

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
    if(!userPresent) return false;
    return user?.wishlist.findIndex((wishlistBook: Book) => wishlistBook._id === book._id) !== -1;
  }

  return (
    <Card className="w-full rounded-sm rounded-t-none">
      <Dialog>
        <DialogTrigger asChild>
        <div className="relative transition-all hover:scale-[103%]">
          <img src={book.image} alt="Book Image" className="w-full hover:shadow-2xl cursor-pointer rounded-t-none border-black border-2" />
          {book.latest ? <img src="/latest.svg" alt="Latest Icon" className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-3 -right-3" /> : null}
        </div>
        </DialogTrigger>
        <DialogContent hideCloseButton={false} className="min-w-[85%] my-16 p-0" onOpenAutoFocus={(e) => {e.preventDefault()}}>
          <ProductDetails isModal={true} book={book} getAuthors={getAuthorNames} addedToCart={addedToCart} setAddedToCart={setAddedToCart} count={count} setCount={setCount} addedToWishlist={addedToWishlist} setAddedToWishlist={setAddedToWishlist} />
          <TabView about={book.about} salient_features={book.salient_features} useful_for={book.useful_for} additional_support={book.additional_support} />
          <Reviews bookId={book._id as string} reviews={reviews} />
          <OtherProductsYouMayFindUseful book={book} isModal={true} />
        </DialogContent>
      </Dialog>
      
      <CardContent className="flex flex-col p-2 sm:p-3">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate-title text-md lg:text-lg font-semibold min-h-[5.5rem]">
                {book.title}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-wrap">{book.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator className="mt-1 mb-1" />
        
        <div className="truncate-text text-xs md:text-sm text-muted-foreground min-h-12">{getAuthorNames(book.authors)}</div>
        
        {/* <div className="hidden lg:flex justify-start items-center gap-2 sm:gap-3 min-h-16 sm:min-h-16">
          {(book && book.discount && (book.discount > 0)) ? <div className="text-xl font-semibold text-primary">&#8377;{getDiscountedPrice(book.price, book.discount).toFixed(0)}</div> : null}
          <div className={`${(book && book.discount && (book.discount > 0)) ? "text-sm md:text-md font-semibold text-muted-foreground line-through": "text-md md:text-lg font-semibold text-primary"}`}>&#8377;{book.price.toFixed(0)}</div>
          {(book && book.discount && (book.discount > 0)) ? <Badge variant="default" className="text-xs scale-75 md:scale-[80%] lg:scale-100 -ml-2 sm:ml-0">
            {(book.discount).toFixed(0)}% OFF
          </Badge> : null}
        </div> */}

        <div className="flex flex-col justify-start items-start gap-2 sm:gap-3 min-h-16 sm:min-h-16">
            <div className="text-xl sm:text-2xl font-semibold text-primary">
              &#8377;{(book && book.discount && (book.discount > 0)) ? getDiscountedPrice(book.price, book.discount).toFixed(0) : book.price.toFixed(0) }
            </div>
            {
              (book && book.discount && (book.discount > 0)) ?
              <div className="flex flex-row gap-2 -mt-2">
                <div className="text-md md:text-md font-semibold text-muted-foreground line-through">
                  &#8377;{book.price.toFixed(0)}
                </div>
                <Badge variant="default" className="text-xs scale-75 md:scale-90 lg:scale-100 -ml-2 sm:ml-0 bg-blue-700 hover:bg-blue-600">{(book.discount).toFixed(0)}% OFF</Badge>
              </div>
              : null
            }
        </div>
        
        {!addedToCart && <div className="flex justify-around mt-2">
          {userPresent ?
            addedToWishlist ? 
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HeartIconFilled className="w-6 h-6" onClick={async () => { removeFromWishlist(book._id as string); dispatch(removeFromWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Removed from Wishlist", description: "One item has been removed from your wishlist"}) }}/>
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
                  <Button variant="ghost" size="icon">  
                    <HeartIcon className="w-6 h-6" onClick={async () => { addToWishlist(book._id as string); dispatch(addToWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Added to Wishlist", description: "One item has been added to your wishlist"}) }} />
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
                <Button variant="ghost" size="icon" disabled={book.outOfStock} onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); setAddedToCart((prev) => !prev)}} >
                  <ShoppingCartIcon className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                  <p>{book.outOfStock ? "Out of Stock" : "Add To Cart"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          }
          {!userPresent && <Button className="mt-2 rounded-sm" disabled={book.outOfStock} onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); setAddedToCart((prev) => !prev)}} >
              <h3 className="flex items-center text-xs sm:text-sm font-semibold"><ShoppingCartIcon className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> {book.outOfStock ? "Out of Stock" : "Add to Cart"}</h3>
            </Button>}
          {(user && user.isAdmin) ? 
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => { route.push(`/edit-book/${book._id}`) }} >
                  <img src="/edit.svg" className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                  <p>Edit Book</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          : null}
        </div>}
        {addedToCart && <div className="flex items-center justify-around flex-row mt-2">
          {userPresent ?
            addedToWishlist ? 
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HeartIconFilled className="w-6 h-6" onClick={async () => { removeFromWishlist(book._id as string); dispatch(removeFromWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Removed from Wishlist", description: "One item has been removed from your wishlist"}) }}/>
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
                  <Button variant="ghost" size="icon">  
                    <HeartIcon className="w-6 h-6" onClick={async () => { addToWishlist(book._id as string); dispatch(addToWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Added to Wishlist", description: "One item has been added to your wishlist"}) }} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add To Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
          : null}
          <div className="flex items-center gap-x-1 sm:gap-x-2 md:gap-x-2">
            {
              count > 1 && <Button
                variant="outline"
                size="icon"
                onClick={() => { dispatch(subtractItemQuantity({ id: book._id as number})); setCount((prev) => prev - 1); }}
                disabled={count <= 1}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
            }
            {
              count <= 1 && <Button 
                variant="outline" 
                size="icon" 
                onClick={() => { dispatch(removeCartItem({ id: book._id as number })); toast({title: "Item Removed", description: "Book(s) successfully removed from your cart"}); route.push("/");}}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9"
              >
              <TrashIcon className="h-4 w-4" />
            </Button>
            }
            <span>{count}</span>
            <Button variant="outline" 
              size="icon" 
              onClick={() => { dispatch(addItemQuantity({ id: book._id as number})); setCount((prev) => prev + 1); }}
              className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          {(user && user.isAdmin) ? 
          <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => { route.push(`/edit-book/${book._id}`) }} >
                <img src="/edit.svg" className="w-6 h-6" />
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