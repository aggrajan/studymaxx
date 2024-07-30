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
import { addItemQuantity, ICartItem, subtractItemQuantity, addCartItem } from "@/lib/slices/cartSlice";
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

export function ItemCard({ bookId } : { bookId: number}) {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const bookState = useAppSelector((state) => state.books.books);
  const book = bookState.filter((givenBook: Book) => givenBook._id === bookId)[0];
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
    }
  }, [userPresent, bookState]);

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
    return (originalPrice * (100 - discount)) / 100.0;
  }

  function checkIfAddedToWishlist() {
    if(!userPresent) return false;
    return user?.wishlist.findIndex((wishlistBook: Book) => wishlistBook._id === book._id) !== -1;
  }

  return (
    <Card className="w-full rounded-md rounded-t-none">
      <Dialog>
        <DialogTrigger asChild>
          <img src={book.image} alt="Book Image" className="w-full hover:shadow-2xl cursor-pointer rounded-t-none transition-all hover:scale-[103%] border-black border-2" />
        </DialogTrigger>
        <DialogContent className="min-w-[85%] my-16 p-0" onOpenAutoFocus={(e) => {e.preventDefault()}}>
          {/* <ScrollArea className="rounded-md border">
            <div className="p-0 sm:p-2"> */}
                <ProductDetails isModal={true} book={book} getAuthors={getAuthorNames} addedToCart={addedToCart} setAddedToCart={setAddedToCart} getQuantity={getQuantity} />
                <TabView />
                <Reviews />
                <OtherProductsYouMayFindUseful book={book} isModal={true} />
            {/* </div>
          </ScrollArea> */}
        </DialogContent>
      </Dialog>
      
      <CardContent className="flex flex-col p-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
                <div className="text-md lg:text-lg font-semibold min-h-16 sm:min-h-20 md:min-h-20">{getTruncatedTitle(book.title)}</div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-wrap">{book.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="text-xs md:text-sm text-muted-foreground min-h-4 md:min-h-8">{getAuthorNames(book.authors)}</div>
        
        <div className="flex justify-start items-center gap-4">
          {(book && book.discount && (book.discount > 0)) ? <div className="text-md md:text-lg font-semibold text-primary">&#8377;{getDiscountedPrice(book.price, book.discount)}</div> : null}
          <div className={`${(book && book.discount && (book.discount > 0)) ? "text-sm md:text-md font-semibold text-muted-foreground line-through": "text-md md:text-lg font-semibold text-primary"}`}>&#8377;{book.price}</div>
          {(book && book.discount && (book.discount > 0)) ? <Badge variant="default" className="text-xs scale-75 md:scale-90 lg:scale-100">
            {(book.discount).toFixed(1)}% OFF
          </Badge> : null}
        </div>
        
        {!addedToCart && <div className="flex mx-auto justify-around w-3/4 mt-2">
          {userPresent && <Button variant="ghost" size="icon">
            {addedToWishlist ? 
            <HeartIconFilled className="w-6 h-6" onClick={async () => { removeFromWishlist(book._id as string); dispatch(removeFromWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Removed from Wishlist", description: "One item has been removed from your wishlist"}) }}/> : 
            <HeartIcon className="w-6 h-6" onClick={async () => { addToWishlist(book._id as string); dispatch(addToWishlistSlice(book)); setAddedToWishlist((prev) => !prev); toast({title: "Added to Wishlist", description: "One item has been added to your wishlist"}) }} />}
            
          </Button>}
          {userPresent && <Button variant="ghost" size="icon" onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); setAddedToCart((prev) => !prev)}} >
            <ShoppingCartIcon className="w-6 h-6" />
          </Button>}
          {!userPresent && <Button variant="outline" className="mx-auto w-full mt-2 bg-gray-300 border-gray-400" onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); setAddedToCart((prev) => !prev)}} >
              <h3 className="font-semibold">Add to Cart</h3>
            </Button>}
          {(user && user.isAdmin) ? <Button variant="ghost" size="icon" onClick={() => { route.push(`/edit-book/${book._id}`) }} >
            <img src="/edit.svg" className="w-6 h-6" />
          </Button> : null}
        </div>}
        {addedToCart && <div className="flex items-center flex-col mt-2">
          <div className="flex items-center gap-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => { dispatch(subtractItemQuantity({ id: book._id as number})); setCount((prev) => prev - 1); }}
              disabled={count <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span>{count}</span>
            <Button variant="outline" size="icon" onClick={() => { dispatch(addItemQuantity({ id: book._id as number})); setCount((prev) => prev + 1) }}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
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