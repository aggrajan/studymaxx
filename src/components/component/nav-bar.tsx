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
import { removeAuthState } from "@/lib/slices/authSlice";
import { clearAllFilters, updateSearchTerm } from "@/lib/slices/searchAndFilterSlice";
import { emptyCart } from "@/lib/slices/cartSlice";
import { SkeletonNavBar } from "../skeleton-components/skeleton-nav-bar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { emptyCheckout } from "@/lib/slices/checkoutSlice";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import { useBookContext } from "@/context/BookContext";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearchHook";

export function NavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.auth);
  const filters = useAppSelector((state) => state.searchAndFilter.filters);
  const cart = useAppSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { userLoading } = useUserContext();

  const { booksLoading } = useBookContext();

  const { isSearching, searchTerm, handleSearchChange } = useDebouncedSearch();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  
  
  const toggle = () => {
    setIsOpen((prevState: boolean) => !prevState);
  };

  function performLogout() {
    setIsClicked(true); 
    logout(); 
    dispatch(removeAuthState()); 
    dispatch(clearAllFilters()); 
    dispatch(emptyCart()); 
    dispatch(emptyCheckout());
    router.push("/");
    setIsClicked(false);
  }

  const handleItemClick = (action: any) => {
    setIsClicked(true);
    action();
    setIsDropdownOpen(false);
    setIsClicked(false);
  };

  if (userLoading || booksLoading) return <SkeletonNavBar />

  return (<>
      
      <div className="fixed top-0 w-full px-4 lg:px-6 h-14 flex items-center bg-blue-700 z-50">
        <Link href="/" className="flex items-center justify-center text-white" prefetch={false}>
          <Image 
            src="/studymaxx logo.png" 
            alt="StudyMaxx Logo" 
            width={96} 
            height={96} 
            className="rounded-sm"
            priority
          />
          <span className="sr-only text-white">StudyMaxx</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2 text-white" prefetch={false}>
            Home
          </Link>
          {/* <Link href="/about-us" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2 text-white" prefetch={false}>
            About Us
          </Link> */}
          <Link href="/mission" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2 text-white" prefetch={false}>
            Mission
          </Link>
          <Link href="/products" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2 text-white" prefetch={false}>
            Products
          </Link>
          <Link href="/#contact-us" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2 text-white" prefetch={false}>
            Contact Us
          </Link>
          {/* {userAuth.user?.isAdmin && <Link href="/add-book" onClick={() => {setIsOpen(false)}} className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2 text-white" prefetch={false}>
            Add book
          </Link>} */}
          
          
          {!isSearchVisible ? (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-white" onClick={() => setIsSearchVisible(true)}>
                    <SearchIcon className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <form className="relative flex-1 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onBlur={() => setIsSearchVisible(false)}
                className="bg-[#f3f3f3] border border-gray-300 rounded-sm py-2 pl-10 pr-4 w-full"
              />
            </form>
          )}

          <ShoppingCartButton />
          
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-gray-100 hover:bg-gray-300 border-black">
                <span className="sr-only">Manage</span>
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Manage account</DropdownMenuLabel>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "hidden" : ""} hover:bg-gray-400`} onClick={(e) => {e.preventDefault(); handleItemClick(() => router.push('/sign-up'));}}>
                  <img src="/register.svg" className="w-4 h-4 mr-2" />Register
              </DropdownMenuItem>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "hidden" : ""} hover:bg-gray-400`} onClick={(e) => {e.preventDefault(); handleItemClick(() => router.push('/sign-in')); }}>
                  <img src="/login.svg" className="w-4 h-4 mr-2" />Login
              </DropdownMenuItem>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "" : "hidden"} hover:bg-gray-400`} onClick={(e) =>  {e.preventDefault();  handleItemClick(performLogout); }}>
                  <img src="/logout.svg" className="w-4 h-4 mr-2" />Logout
              </DropdownMenuItem>
              <DropdownMenuSeparator className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "" : "hidden"}`} />
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-feedbacks')); }}>
                  <img src="/feedback.svg" className="w-4 h-4 mr-2" />All Feedbacks
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-queries')); }}>
                  <img src="/query.svg" className="w-4 h-4 mr-2" />All Queries
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-coupons')); }}>
                  <img src="/coupon.svg" className="w-4 h-4 mr-2" />All Coupons
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/all-orders')); }}>
                  <img src="/order.svg" className="w-4 h-4 mr-2" />All Orders
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/add-book')); }}>
                  <img src="/book.svg" className="w-4 h-4 mr-2" />Add Book
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/qr/add')); }}>
                  <img src="/qr-code.svg" className="w-4 h-4 mr-2" />Add QR
              </DropdownMenuItem>
              <DropdownMenuItem className={`${(userAuth.userPresent && userAuth.user?.isAdmin) ? "cursor-pointer" : "hidden"} hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/qr/view')); }}>
                  <img src="/scan-line.svg" className="w-4 h-4 mr-2" />View QR
              </DropdownMenuItem>
              <DropdownMenuSeparator className={`${userAuth.userPresent ? "" : "hidden"}`} />
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" } hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/wishlist'));}}>
                  <img src="/wishlist.svg" className="w-4 h-4 mr-2" />Your Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" } hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/user-profile')); }}>
                  <img src="/profile.svg" className="w-4 h-4 mr-2" />Your Profile
              </DropdownMenuItem>
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" } hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/queries')); }}>
                  <img src="/query.svg" className="w-4 h-4 mr-2" />Your Queries
              </DropdownMenuItem>
              <DropdownMenuItem className={`${ userAuth.userPresent ? "cursor-pointer" : "hidden" } hover:bg-gray-400`} onClick={(e) => { e.preventDefault(); handleItemClick(() => router.push('/my-orders')); }}>
                  <img src="/order.svg" className="w-4 h-4 mr-2" />Your Orders
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
        <Link href="/" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={true}>
          Home
        </Link>
        <Link href="/about-us" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={true}>
          About Us
        </Link>
        <Link href="/mission" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={true}>
          Mission
        </Link>
        <Link href="/products" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={true}>
          Products
        </Link>
        <Link href="/#contact-us" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={true}>
          Contact Us
        </Link>
        {/* {userAuth.user?.isAdmin && <Link href="/add-book" onClick={() => {setIsOpen(false)}} className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={true}>
            Add book
        </Link>} */}
      </div>
    </>
  );
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