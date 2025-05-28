"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "@/app/apiCalls/callCart";
import { getProfile } from "@/app/apiCalls/callProfile";
import { getWishlist } from "@/app/apiCalls/callWishlist";
import { checkIsTokenAvailable } from "@/app/apiCalls/checkIsTokenAvailable";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthState, removeAuthState } from "@/lib/slices/authSlice";
import { setCart, emptyCart } from "@/lib/slices/cartSlice";
import { clearAllFilters } from "@/lib/slices/searchAndFilterSlice";
type UserContextType = {
  userLoading: boolean;
};

const UserContext = createContext<UserContextType>({ userLoading: true });

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await checkIsTokenAvailable();

      if (token) {
        try {
          const user = await getProfile();
          const wishlist = await getWishlist(user._id);
          const cart = await getCart(user._id);
          user.wishlist = wishlist;

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
  }, []);

  return (
    <UserContext.Provider value={{ userLoading }}>
      {children}
    </UserContext.Provider>
  );
};