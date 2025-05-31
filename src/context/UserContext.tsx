"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "@/app/apiCalls/callCart";
import { getProfile } from "@/app/apiCalls/callProfile";
import { getWishlist } from "@/app/apiCalls/callWishlist";
import { checkIsTokenAvailable } from "@/app/apiCalls/checkIsTokenAvailable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthState, removeAuthState } from "@/lib/slices/authSlice";
import { setCart, emptyCart } from "@/lib/slices/cartSlice";
import { clearAllFilters } from "@/lib/slices/searchAndFilterSlice";
import { RehydrationContext } from "@/app/StoreProvider";
import { Book } from "@/model/Books";

type UserContextType = {
  userLoading: boolean;
};

const UserContext = createContext<UserContextType>({ userLoading: true });

export const useUserContext = () => useContext(UserContext);

function convertWishlistToUserWishlist(wishlist: { product: Book }[]): Book[] {
    return wishlist.map(item => item.product);
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [userLoading, setUserLoading] = useState(true);
  const { rehydrated } = useContext(RehydrationContext);
  const userPresent = useAppSelector((state) => state.auth.userPresent)

  useEffect(() => {
    if(!rehydrated) return ;

    (async () => {
      const token = await checkIsTokenAvailable();

      if (token) {
        try {
          const user = await getProfile();
          const wishlist = await getWishlist(user._id);
          const cart = await getCart(user._id);
          user.wishlist = convertWishlistToUserWishlist(wishlist);

          dispatch(setAuthState(user));
          dispatch(setCart(cart.items));
        } catch (err) {
          dispatch(removeAuthState());
          dispatch(emptyCart());
          dispatch(clearAllFilters());
        }
      } else {
        dispatch(removeAuthState());
        dispatch(emptyCart());
        dispatch(clearAllFilters());
      }

      setUserLoading(false);
    })();
  }, [rehydrated, userPresent, dispatch]);

  return (
    <UserContext.Provider value={{ userLoading }}>
      {children}
    </UserContext.Provider>
  );
};