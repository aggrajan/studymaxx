"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export function NavBar(props: any) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (e: any) => {
      e.preventDefault();
      setSearchTerm(e.target.value);
    }
    const toggle = () => {
      setIsOpen((prevState: boolean) => !prevState);
    };
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
          
          {!isSearching ? <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { setIsSearching((prev) => !prev) }}>
            <SearchIcon className="h-5 w-5"  />
            <span className="sr-only">Search</span>
          </Button> : <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={handleSearch}
                onBlur={(e) => {e.preventDefault(); setIsSearching((prev) => !prev)}}
                className="bg-[#f3f3f3] border border-gray-300 rounded-md py-2 pl-10 pr-4 w-full"
              />
            </div>}
          <Button onClick={(e) => {e.preventDefault(); router.push('/cart')}} variant="ghost" size="icon" className="rounded-full">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Shopping Cart</span>
            {cartCount > 0 && <Badge className="ml-2 bg-primary text-primary-foreground">{cartCount}</Badge>}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="sr-only">Account</span>
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/sign-up" prefetch={false}>
                  Register
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/sign-in" prefetch={false}>
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div onClick={(e) =>  {e.preventDefault(); props.logout()}}>
                  Logout
                </div>
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