"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "../ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { ShoppingCartButton } from "../client-only-components/shopping-cart-button";
import { logout } from "@/app/apiCalls/callLogout";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthState, removeAuthState } from "@/lib/slices/authSlice";
import { clearAllFilters, updateSearchTerm } from "@/lib/slices/searchAndFilterSlice";
import { getProfile } from "@/app/apiCalls/callProfile";
import { getSearchedAndFilteredBooks } from "@/helpers/getSearchedAndFilteredBooks";
import { setStoreBooks } from "@/lib/slices/bookStoreSlice";
import { setBooks } from "@/lib/slices/booksSlice";
import { checkIsTokenAvailable } from "@/app/apiCalls/checkIsTokenAvailable";
import { emptyCart, setCart } from "@/lib/slices/cartSlice";
import { getBooks } from "@/app/apiCalls/callBooks";
import { SkeletonNavBar } from "../skeleton-components/skeleton-nav-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { emptyCheckout } from "@/lib/slices/checkoutSlice";

export function NavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.auth);
  const searchTerm = useAppSelector((state) => state.searchAndFilter.searchTerm);
  const filters = useAppSelector((state) => state.searchAndFilter.filters);
  const cart = useAppSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [userConfig, setUserConfig] = useState(false);
  const [booksConfig, setBooksConfig] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if(searchTerm === "" && filters.board.length === 0 &&
      filters.categorie.length === 0 && filters.clas.length === 0 && 
      filters.exam.length === 0 && filters.language.length === 0 &&
      filters.subject.length === 0 && cart.cartCount === 0
    ) return ;
    if(userAuth.userPresent) return ;
    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }

    window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
    }

  }, [searchTerm, filters, cart, userAuth])

  useEffect(() => {(async () => {
    const checkIfToken = await checkIsTokenAvailable();
    if(checkIfToken) {
      const user = await getProfile();
      if(user) dispatch(setAuthState(user));
      if(user?.cart && user.cart) dispatch(setCart(user.cart));
      setUserConfig(true);
    } else {
      dispatch(removeAuthState());
      dispatch(clearAllFilters());
      dispatch(emptyCart());
      setUserConfig(true);
    }
  })()}, [userAuth.userPresent]);

  useEffect(() => {
    (async () => {
      const allStoreBooks = await getBooks();
      dispatch(setStoreBooks(allStoreBooks));
      setBooksConfig(true);
    })();
  }, []);
  
  const toggle = () => {
    setIsOpen((prevState: boolean) => !prevState);
  };

  const search = (searchText: string) => {
    (async () => {
      const books = await getSearchedAndFilteredBooks(searchText, filters.subject, filters.clas, filters.language, filters.board, filters.categorie, filters.exam);
      dispatch(setBooks(books));
    })();
  }

  function performLogout() {
    setIsClicked(true); 
    logout(); 
    dispatch(removeAuthState()); 
    dispatch(clearAllFilters()); 
    dispatch(emptyCart()); 
    dispatch(emptyCheckout());
    setIsClicked(false);
  }

  const handleItemClick = (action: any) => {
    setIsClicked(true);
    action();
    setIsDropdownOpen(false);
    setIsClicked(false);
  };

  return (<>
      {(userConfig && booksConfig) ? <>
      <div className="fixed top-0 w-full px-4 lg:px-6 h-14 flex items-center bg-white z-50 border shadow">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <BookIcon className="h-6 w-6" />
          <span className="sr-only">StudyMaxx</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Home
          </Link>
          <Link href="/about-us" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            About Us
          </Link>
          <Link href="/mission" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Mission
          </Link>
          <Link href="/products" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Products
          </Link>
          <Link href="/#contact-us" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Contact Us
          </Link>
          {userAuth.user?.isAdmin && <Link href="/add-book" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Add book
          </Link>}
          
          {!isSearching ? <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { setIsSearching((prev) => !prev) }}>
                  <SearchIcon className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> : <form className="relative flex-1 max-w-md" onSubmit={(e) => {e.preventDefault(); search(searchTerm);}}>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => { dispatch(updateSearchTerm(e.target.value)); }}
                onBlur={(e) => { e.preventDefault(); setIsSearching((prev) => !prev); }}
                className="bg-[#f3f3f3] border border-gray-300 rounded-sm py-2 pl-10 pr-4 w-full"
              />
            </form>}

          <ShoppingCartButton />
          
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className="sr-only">Manage</span>
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Manage account</DropdownMenuLabel>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "hidden" : ""}`} onClick={(e) => {e.preventDefault(); handleItemClick(() => router.push('/sign-up'));}}>
                  <img src="/register.svg" className="w-4 h-4 mr-2" />Register
              </DropdownMenuItem>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "hidden" : ""}`} onClick={(e) => {e.preventDefault(); handleItemClick(() => router.push('/sign-in')); }}>
                  <img src="/login.svg" className="w-4 h-4 mr-2" />Login
              </DropdownMenuItem>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "" : "hidden"}`} onClick={(e) =>  {e.preventDefault();  handleItemClick(performLogout); router.push("/");}}>
                  <img src="/logout.svg" className="w-4 h-4 mr-2" />Logout
              </DropdownMenuItem>
              <DropdownMenuSeparator className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "" : "hidden"}`} />
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"}`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-feedbacks')); }}>
                  <img src="/feedback.svg" className="w-4 h-4 mr-2" />All Feedbacks
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"}`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-queries')); }}>
                  <img src="/query.svg" className="w-4 h-4 mr-2" />All Queries
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"}`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-coupons')); }}>
                  <img src="/coupon.svg" className="w-4 h-4 mr-2" />All Coupons
              </DropdownMenuItem>
              <DropdownMenuSeparator className={`${userAuth.userPresent ? "" : "hidden"}`} />
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" }`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/wishlist'));}}>
                  <img src="/wishlist.svg" className="w-4 h-4 mr-2" />Your Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" }`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/user-profile')); }}>
                  <img src="/profile.svg" className="w-4 h-4 mr-2" />Your Profile
              </DropdownMenuItem>
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" }`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/queries')); }}>
                  <img src="/query.svg" className="w-4 h-4 mr-2" />Your Queries
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {!isOpen ? <img
            src="/hamburger.svg"
            width="24"
            height="24"
            onClick={toggle}
            className="md:hidden cursor-pointer"
          /> : <img 
            src="/cross-23.svg"
            width="24"
            height="24"
            onClick={toggle}
            className="md:hidden cursor-pointer"
          />}
        </nav>
      </div>
      <div className={`fixed top-14 w-full ${ isOpen ? "border shadow bg-white" : ""}  z-50 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden md:hidden flex flex-col gap-1 p-2 justify-start items-start`}>
        <Link href="/" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Home
        </Link>
        <Link href="/about-us" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          About Us
        </Link>
        <Link href="/mission" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Mission
        </Link>
        <Link href="/products" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Products
        </Link>
        <Link href="/#contact-us" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Contact Us
        </Link>
        {userAuth.user?.isAdmin && <Link href="/add-book" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Add book
        </Link>}
      </div></> : 
      <SkeletonNavBar />}
    </>
  );
}

function BookIcon(props: any) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}



function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}