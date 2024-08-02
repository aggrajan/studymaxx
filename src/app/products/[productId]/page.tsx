"use client";
import { getBook } from "@/app/apiCalls/callBook";
import { Footer } from "@/components/component/footer";
import { LatestArrivals } from "@/components/component/latest-arrivals";
import { NavBar } from "@/components/component/nav-bar";
import { OtherProductsYouMayFindUseful } from "@/components/component/other-products-you-may-find-useful";
import { ProductDetails } from "@/components/component/product-details";
import { Reviews } from "@/components/component/reviews";
import { TabView } from "@/components/component/tab-view";
import { BreadCrumb } from "./breadcrumb";
import { Book } from "@/model/Books";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Author } from "@/model/Authors";
import { Review } from "@/model/Review";
import { getReviews } from "@/app/apiCalls/callReviews";

export default function Product() {
    const { cartItems } = useAppSelector((state) => state.cart);
    const params = useParams<{productId: string}>();
    const id = params.productId
    const [book, setBook] = useState<Book>({"_id":"","title":" ","image":"/placeholder.svg","authors":[{"name":"-"}],"price":0,"level":"","subject":"","board":"","exam":"","keywords":[""],"language":"","isbn":"","number_of_pages":0,"year":0,"size":"","binding":"","category":""} as Book);
    const [addedToCart, setAddedToCart] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([])
    const [count, setCount] = useState(0);
    const userPresent = useAppSelector((state) => state.auth.userPresent)


    function getAuthors(authors: Author[]): string {
        if(authors === undefined) return "";
        return authors.map((author) => author.name).join(", ");
    }

    useEffect(() => {
        if(book._id !== "") return ;
        (async () => {
            const currentBook: Book = await getBook(id);
            setBook(currentBook);
            const cartIndex = cartItems.findIndex((cartItem) => cartItem.product._id === currentBook._id);
            
            if(cartIndex !== -1 && cartItems[cartIndex].quantity > 0) {
                setAddedToCart(true);
                setCount(cartItems[cartIndex].quantity)
            }
            
            const currentReviews: Review[] = await getReviews(id);
            setReviews(currentReviews);
        })();
    }, [book, userPresent]);

    return (
        <>
 
            <BreadCrumb title={book.title} category={book.category} />
            <ProductDetails isModal={false} book={book} getAuthors={getAuthors} addedToCart={addedToCart} setAddedToCart={setAddedToCart} count={count} setCount={setCount} />
            <TabView about={book.about} salient_features={book.salient_features} useful_for={book.useful_for} additional_support={book.additional_support} />
            <Reviews bookId={book._id as string} reviews={reviews} />
            <OtherProductsYouMayFindUseful book={book} isModal={false} />
            <LatestArrivals />
            <div className="mb-24"></div>
        </>
    );
}