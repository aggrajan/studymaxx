"use client"

import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { ShoppingCartButton } from "../client-only-components/shopping-cart-button";
import { logout } from "@/app/apiCalls/callLogout";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthState, removeAuthState } from "@/lib/slices/authSlice";
import { updateSearchTerm } from "@/lib/slices/searchAndFilterSlice";
import { getProfile } from "@/app/apiCalls/callProfile";
import { getSearchedAndFilteredBooks } from "@/helpers/getSearchedAndFilteredBooks";
import { setBooks } from "@/lib/slices/booksSlice";

export function NavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector((state) => state.auth);
  const searchTerm = useAppSelector((state) => state.searchAndFilter.searchTerm);
  const filters = useAppSelector((state) => state.searchAndFilter.filters);

  useEffect(() => {(async () => {
    const user = await getProfile();
    if(user) dispatch(setAuthState(user));
  })()}, []);


  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const toggle = () => {
    setIsOpen((prevState: boolean) => !prevState);
  };

  const search = (searchText: string) => {
    (async () => {
      const books = await getSearchedAndFilteredBooks(searchText, filters.subject, filters.clas, filters.language, filters.board, filters.categorie, filters.exam);
      dispatch(setBooks(books));
    })();
  }
  return (<>
      <header className="fixed top-0 w-full px-4 lg:px-6 h-14 flex items-center bg-white z-50 border shadow">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <BookIcon className="h-6 w-6" />
          <span className="sr-only">Bookworm</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Home
          </Link>
          <Link href="/about-us" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            About Us
          </Link>
          <Link href="/mission" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Mission
          </Link>
          <Link href="/products" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Products
          </Link>
          <Link href="/#contact-us" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Contact Us
          </Link>
          {userAuth.user?.isAdmin && <Link href="/add-book" className="hidden md:inline text-sm font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Add book
          </Link>}
          
          {!isSearching ? <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { setIsSearching((prev) => !prev) }}>
            <SearchIcon className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button> : <form className="relative flex-1 max-w-md" onSubmit={(e) => {e.preventDefault(); search(searchTerm);}}>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => { dispatch(updateSearchTerm(e.target.value)); }}
                onBlur={(e) => { e.preventDefault(); setIsSearching((prev) => !prev); }}
                className="bg-[#f3f3f3] border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full"
              />
            </form>}
          <ShoppingCartButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="sr-only">Account</span>
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "hidden" : ""}`} onClick={(e) => {e.preventDefault(); setIsClicked(true); router.push('/sign-up'); setIsClicked(false);}}>
                  Register
              </DropdownMenuItem>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "hidden" : ""}`} onClick={(e) => {e.preventDefault(); setIsClicked(true); router.push('/sign-in'); setIsClicked(false);}}>
                  Login
              </DropdownMenuItem>
              <DropdownMenuItem className={`${isClicked ? "cursor-wait" : "cursor-pointer"} ${userAuth.userPresent ? "" : "hidden"}`} onClick={(e) =>  {e.preventDefault(); setIsClicked(true); logout(); dispatch(removeAuthState()); setIsClicked(false);}}>
                  Logout
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
      </header>
      <div className={`fixed top-14 w-full ${ isOpen ? "border shadow bg-white" : ""}  z-50 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden md:hidden flex flex-col gap-1 p-2 justify-start items-start`}>
        <Link href="/" className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Home
        </Link>
        <Link href="/about-us" className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          About Us
        </Link>
        <Link href="/mission" className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Mission
        </Link>
        <Link href="/products" className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Products
        </Link>
        <Link href="/#contact-us" className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
          Contact Us
        </Link>
        {userAuth.user?.isAdmin && <Link href="/add-book" className="block md:hidden text-md font-medium hover:underline underline-offset-4 pt-2" prefetch={false}>
            Add book
        </Link>}
      </div>

    </>);
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