"use client"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShareButton } from "./share-button"
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { addCartItem, addItemQuantity, ICartItem, removeCartItem, subtractItemQuantity } from "@/lib/slices/cartSlice";
import { useToast } from "../ui/use-toast"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog"
import PdfPreview from "./preview-pdf"
import { useEffect, useState } from "react"
import { addToWishlist } from "@/app/apiCalls/callAddtoWishlist"
import { removeFromWishlist } from "@/app/apiCalls/removeFromWishlist"
import { addToWishlist as addToWishlistSlice, removeFromWishlist as removeFromWishlistSlice } from "@/lib/slices/authSlice"
import { setCheckout } from "@/lib/slices/checkoutSlice"
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Card, CardContent } from "../ui/card"

export function ProductDetails(props: any) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

 
  

  const { userPresent } = useAppSelector((state) => state.auth);
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItem: ICartItem = {
    quantity: 1,
    product: props.book
  }
  const { toast } = useToast();
  function getDiscountedPrice(originalPrice: number, discount: number): number {
    return (originalPrice * (100 - discount)) / 100.0;
  }

  useEffect(() => {
    if(typeof window !== "undefined") {
      const currentLocation: string = window.location.toString();
      if(currentLocation.includes("products")) {
        setUrl(currentLocation)
      } 
      else {
        setUrl(`${currentLocation}products//${props.book._id}`)
      }
    }
  }, []);

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent((api.selectedScrollSnap()) % props.book.previewImages.length)
    api.on("select", () => {
      setCurrent((api.selectedScrollSnap()) % props.book.previewImages.length)
    })
  }, [api])

  

  const { isModal } = props;
  return (
    <div className={`${isModal ? "flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 mx-auto py-6" : "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 mx-auto py-6"}`}>
      <div className="grid gap-4">
        {(props.book.previewImages === undefined || props.book.previewImages.length === 0) ? <img
          src={props.book.image}
          alt="Book Cover"
          width={450}
          className="rounded-sm border-gray-500 aspect-[3/4] object-cover shadow-lg hover:shadow-gray-500 transition-shadow duration-300 md:ml-auto mx-auto"
        /> : <><Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true
          }} 
          className="md:ml-auto mx-auto sm:w-[425px] w-full" 
        >
          <CarouselContent className="rounded-sm">
            {props.book.previewImages.map((previewImage: string, index: number) => (
              <CarouselItem key={`carousel_${index}`} className="select-none rounded-sm">
              <Card className={`cursor-pointer rounded-sm transition-all duration-500 ease-in-out p-0`}>
                <CardContent className="p-0 rounded-sm">
                  <img src={previewImage} width={450} className="w-full rounded-sm" />
                </CardContent>
              </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="md:ml-auto mx-auto w-[250px] h-full" 
        >
          <CarouselContent className="h-full">
            {props.book.previewImages.map((previewImage: string, index: number) => (
              <CarouselItem className="basis-1/4 select-none flex items-center justify-center h-full" key={`preview_carousel_${index}`}>
                <div className={`cursor-pointer rounded-sm transition-all duration-500 ease-in-out hover:scale-110 ${current === index ? "scale-110 opacity-100" : "scale-90 opacity-75"}  hover:opacity-100`}
                onClick={(e) => {
                  e.preventDefault();
                  api?.scrollTo(index);
                  
                }}>
                  <img src={previewImage} className="object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        </>
        }
        
      </div>
      <div className="grid gap-4 md:gap-8">
        <div className="grid gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-primary w-full md:w-[30rem]">{props.book.title}</h1>
          <div className="flex flex-row justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>by</span>
              <Link href="#" className="text-primary hover:underline underline-offset-4 w-full md:w-[25rem]" prefetch={false}>
                {props.getAuthors(props.book.authors)}
              </Link>
              <ShareButton link={`${url}`} />
            </div>
            {isModal && <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="rounded-full border-2 p-2 shadow-xl absolute left-5 top-4 transform transition-transform duration-300 hover:bg-white hover:scale-110" variant="outline" onClick={() => router.push(`/products/${props.book._id}`)}>
                      <img src="/full-screen.svg" width={18} className="cursor-pointer"  />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open in full-screen mode</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
            } 
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-start gap-4">
            {props.book.discount > 0 && <div className="text-2xl font-bold text-primary">&#8377;{getDiscountedPrice(props.book.price, props.book.discount).toFixed(0)}</div>}
            <div className={`${props.book.discount > 0 ? "text-xl font-bold text-muted-foreground line-through": "text-2xl font-bold text-primary"}`}>&#8377;{props.book.price.toFixed(0)}</div>
            {props.book.discount > 0 && <Badge variant="default">{(props.book.discount).toFixed(0)}% OFF</Badge>}
          </div> 
          {(props.book.pdfUrl && props.book.pdfUrl !== "") ? <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="mr-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors mt-4">
                Preview
              </Button>
            </DialogTrigger>
            <DialogContent hideCloseButton={true} className="min-w-[85%] my-16 p-0 h-full" onOpenAutoFocus={(e) => {e.preventDefault()}}>
              <PdfPreview pdfUrl={props.book.pdfUrl} />
                <DialogClose asChild className="absolute top-2 left-2 z-50">
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
            </DialogContent>
          </Dialog> : null}
          <div>
            <h2 className="text-sm font-semibold pt-2">Share on Social Media</h2>
            <div className="flex gap-2 mt-1">
              <TwitterShareButton url={url} title={props.book.title}>
                <img src="/twitter.svg" className="w-6 h-6" />
              </TwitterShareButton>
              <WhatsappShareButton url={url} title={props.book.title}>
                <img src="/whatsapp.svg" className="w-6 h-6" />
              </WhatsappShareButton>
              <LinkedinShareButton url={url} title={props.book.title}>
                <img src="/linkedInColor.svg" className="w-6 h-6" />
              </LinkedinShareButton>
              <FacebookShareButton url={url} title={props.book.title}>
                <img src="/facebookColor.svg" className="w-6 h-6" />
              </FacebookShareButton>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/language.svg" width={22} />
              <div className="text-sm font-semibold">Language</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.language}</div>
          </div>
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/isbn.svg" width={22} />
              <div className="text-sm font-semibold">ISBN</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.isbn}</div>
          </div>
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/pages.svg" width={22} />
              <div className="text-sm font-semibold">Pages</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.number_of_pages}</div>
          </div>
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/year.svg" width={22} />
              <div className="text-sm font-semibold">Year</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.year}</div>
          </div>
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/size.svg" width={22} />
              <div className="text-sm font-semibold">Size</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.size}</div>
          </div>
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/paperback.svg" width={22} />
              <div className="text-sm font-semibold">Binding</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.binding}</div>
          </div>
          <div className="grid gap-1">
            <div className="flex justify-start items-center gap-1">
              <img src="/category.svg" width={22} /> 
              <div className="text-sm font-semibold">Category</div>
            </div>
            <div className="text-sm text-muted-foreground ml-[25px]">{props.book.category}</div>
          </div>
        </div>
        
        {!props.addedToCart && <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-x-3 gap-y-3 ${isModal ? "w-full" : "w-full lg:w-5/6"}`}>
          <Button size="lg" disabled={props.book.outOfStock} className={`flex-1 px-2 text-primary-foreground hover:bg-primary/90 transition-colors ${props.book.outOfStock ? "text-red-500 bg-gray-200" : "bg-primary"}`} onClick={() => { dispatch(addCartItem(cartItem)); toast({title: "Added to Cart", description: "One item successfully added to cart"}); props.setAddedToCart((prev: boolean) => !prev) }}>
            <ShoppingCartIcon className="mr-2 h-4 w-4" />
            {props.book.outOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
          <Button size="lg" disabled={props.book.outOfStock} className={`flex-1 px-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ${props.book.outOfStock ? "text-red-500 bg-gray-200" : "bg-primary"}`} onClick={() => { dispatch(setCheckout([cartItem])); router.push("/payment"); }}>
            <img src={props.book.outOfStock ? "/rupeeRed.svg" : "/rupee.svg"} width={20} className="mr-1"/>
            {props.book.outOfStock ? "Out of Stock" : "Buy Now"}
          </Button>
          {!props.addedToWishlist ? <Button
            size="lg"
            variant="outline"
            className={`flex-1 border-primary px-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors ${userPresent ? "" : "hidden"}`}
            onClick={async () => { addToWishlist(props.book._id as string); dispatch(addToWishlistSlice(props.book)); props.setAddedToWishlist((prev: boolean) => !prev); toast({title: "Added to Wishlist", description: "One item has been added to your wishlist"}) }}
          >
            <HeartIcon className="mr-2 h-4 w-4" />
            Add to Wishlist
          </Button> : <Button
            size="lg"
            variant="outline"
            className={`flex-1 border-primary px-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors ${userPresent ? "" : "hidden"}`}
            onClick={async () => { removeFromWishlist(props.book._id as string); dispatch(removeFromWishlistSlice(props.book)); props.setAddedToWishlist((prev: boolean) => !prev); toast({title: "Removed from Wishlist", description: "One item has been removed from your wishlist"}) }}
          >
            <HeartIconFilled className="mr-2 h-4 w-4" />
            Remove From Wishlist
          </Button>}
        </div>}

        {props.addedToCart && <div className="grid grid-cols-2 lg:flex gap-2 w-[25em]">
          <div className="flex items-center gap-2 w-full">
            {props.count > 1 && <Button
              variant="outline"
              size="icon"
              onClick={() => { dispatch(subtractItemQuantity({ id: props.book._id as number})); props.setCount((prev: number) => prev - 1) }}
              disabled={props.count === 1}
              className="w-32"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>}
            {
              props.count <= 1 && <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  dispatch(removeCartItem({ id: props.book._id as number })); toast({title: "Item Removed", description: "Book(s) successfully removed from your cart"}); router.push(`/products/${props.book._id}`);
                }}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
            <span>{props.count}</span>
            <Button variant="outline" className="w-32" size="icon" onClick={() => { dispatch(addItemQuantity({ id: props.book._id as number})); props.setCount((prev: number) => prev + 1); }}>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>}
        
      </div>
    </div>
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
  )
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
