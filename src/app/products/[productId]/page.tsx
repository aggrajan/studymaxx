"use client";
import { getBook } from "@/app/apiCalls/callBook";
import { Footer } from "@/components/component/footer";
import { LatestArrivals } from "@/components/component/latest-arrivals";
import { NavBar } from "@/components/component/nav-bar";
import { OtherProductsYouMayFindUseful } from "@/components/component/other-products-you-may-find-useful";
import { ProductDetails } from "@/components/component/product-details";
import { Reviews } from "@/components/component/reviews";
import { TabView } from "@/components/component/tab-view";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Book } from "@/model/Books";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";

export default function Product() {
    const { cartItems } = useAppSelector((state) => state.cart);
    const params = useParams<{productId: string}>();
    const id = params.productId
    const [book, setBook] = useState<Book>({"_id":"","title":" ","image":"/placeholder.svg","authors":[{"name":"-"}],"price":0,"level":"","subject":"","board":"","exam":"","keywords":[""],"language":"","isbn":"","number_of_pages":0,"year":0,"size":"","binding":"","category":""} as Book);
    const [addedToCart, setAddedToCart] = useState(false);

    function getAuthors(authors: string[]): string {
        return authors.join(", ");
    }

    useEffect(() => {
        (async () => {
            const currentBook: Book = await getBook(id);
            if(book._id !== currentBook._id) setBook(currentBook);
            if(getQuantity() > 0) setAddedToCart(true);
            console.log("quantity", getQuantity(), book);
        })();
    }, [book]);

  
    function getQuantity(): number {
      const cartIndex = cartItems.findIndex((cartItem) => cartItem.product._id === book!._id);
      if(cartIndex === -1) return 0;
      return cartItems[cartIndex].quantity
    }

    return (
        <>
            <NavBar />
            <Breadcrumb className="px-4 lg:px-6 mt-16">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>The Alchemist</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <ProductDetails isModal={false} book={book} getAuthors={getAuthors} addedToCart={addedToCart} setAddedToCart={setAddedToCart} getQuantity={getQuantity} />
            <TabView />
            <Reviews />
            <OtherProductsYouMayFindUseful />
            <LatestArrivals />
            <Footer />
        </>
    );
}