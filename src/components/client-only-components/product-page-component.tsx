"use client";

import { Book } from "@/model/Books";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { Author } from "@/model/Authors";
import { ProductDetails } from "@/components/component/product-details";
import { Reviews } from "@/components/component/reviews";
import { OtherProductsYouMayFindUseful } from "@/components/component/other-products-you-may-find-useful";
import { LatestArrivals } from "@/components/component/latest-arrivals";
import { TabView } from "@/components/component/tab-view";
import { BreadCrumb } from "@/app/products/[productId]/breadcrumb";
import { SkeletonProductPage } from "@/components/skeleton-components/skeleton-product-page";

interface Props {
  book: Book;
}

export const ProductPageClient = ({ book }: Props) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userPresent, user } = useAppSelector((state) => state.auth);

  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [count, setCount] = useState(0);
  const [bookConfig, setBookConfig] = useState(false);

  useEffect(() => {
    const wishlistMatch = userPresent && user?.wishlist.some((b: Book) => b._id === book._id);
    if(wishlistMatch) setAddedToWishlist(wishlistMatch);

    const cartItem = cartItems.find(item => item.product._id === book._id);
    if (cartItem) {
      setAddedToCart(true);
      setCount(cartItem.quantity);
    }

    setBookConfig(true);
  }, [book, userPresent, cartItems, user?.wishlist]);

  function getAuthors(authors: Author[] | undefined): string {
    return authors?.map((a) => a.name).join(", ") || "";
  }

  return bookConfig ? (
    <>
      <BreadCrumb title={book.title} category={book.category} />
      <ProductDetails
        isModal={false}
        book={book}
        getAuthors={getAuthors}
        addedToCart={addedToCart}
        setAddedToCart={setAddedToCart}
        count={count}
        setCount={setCount}
        addedToWishlist={addedToWishlist}
        setAddedToWishlist={setAddedToWishlist}
      />
      <TabView
        about={book.about}
        salient_features={book.salient_features}
        useful_for={book.useful_for}
        additional_support={book.additional_support}
      />
      <Reviews bookId={book._id as string} />
      <OtherProductsYouMayFindUseful book={book} isModal={false} />
      <LatestArrivals />
      <div className="mb-24" />
    </>
  ) : (
    <SkeletonProductPage isModal={false} />
  );
};
