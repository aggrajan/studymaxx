"use client";
import { getBook } from "@/app/apiCalls/callBook";
import { LatestArrivals } from "@/components/component/latest-arrivals";
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
import { SkeletonProductPage } from "@/components/skeleton-components/skeleton-product-page";
import Head from "next/head";

export default function Product() {
    const { cartItems } = useAppSelector((state) => state.cart);
    const [addedToWishlist, setAddedToWishlist] = useState<boolean>(false);
    const { userPresent, user } = useAppSelector((state) => state.auth);

    const params = useParams<{productId: string}>();
    const id = params.productId
    const [book, setBook] = useState<Book>({"_id":"","title":" ","image":"/placeholder.svg","authors":[{"name":"-"}],"price":0,"level":"","subject":"","board":"","exam":"","keywords":[""],"language":"","isbn":"","number_of_pages":0,"year":0,"size":"","binding":"","category":"", "about": [""], "salient_features": [""], "useful_for": [""], "additional_support": [""]} as Book);
    const [addedToCart, setAddedToCart] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([])
    const [count, setCount] = useState(0);
    const [bookConfig, setBookConfig] = useState(false);

    function getAuthors(authors: Author[]): string {
        if(authors === undefined) return "";
        return authors.map((author) => author.name).join(", ");
    }

    useEffect(() => {
        const isAddedToWishlist = checkIfAddedToWishlist();
        if(isAddedToWishlist) {
            setAddedToWishlist(true);
        }
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

            setBookConfig(true);
        })();

        
    }, [book, userPresent]);

    function checkIfAddedToWishlist() {
        if(!userPresent) return false;
        return user?.wishlist.findIndex((wishlistBook: Book) => wishlistBook._id === book._id) !== -1;
      }

    return (
        <>
            <Head>
                <title>{book.title}</title>
                <meta name="description" content="Checkout this amazing book on StudyMaxx" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:image" content={book.image} />
                <meta property="og:title" content={book.title} />
                <meta property="og:description" content={book.about[0]} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:site" content="study-maxx" />
                <meta property="twitter:title" content={book.title} />
                <meta property="twitter:description" content={book.about[0]} />
                <meta property="twitter:image" content={book.image} />
                <meta property="twitter:url" content={`http://localhost:3000/products/${book._id}`} />
            </Head>
            {bookConfig ? <>
            <BreadCrumb title={book.title} category={book.category} />
            <ProductDetails isModal={false} book={book} getAuthors={getAuthors} addedToCart={addedToCart} setAddedToCart={setAddedToCart} count={count} setCount={setCount} addedToWishlist={addedToWishlist} setAddedToWishlist={setAddedToWishlist} />
            <TabView about={book.about} salient_features={book.salient_features} useful_for={book.useful_for} additional_support={book.additional_support} />
            <Reviews bookId={id} reviews={reviews} />
            <OtherProductsYouMayFindUseful book={book} isModal={false} />
            <LatestArrivals />
            <div className="mb-24"></div>
            </> : <SkeletonProductPage isModal={false} />}
        </>
    );
}