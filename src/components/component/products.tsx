"use client";

import { useState } from "react"
import { ItemCard } from "./item-card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { subjects, levels, boards, languages, categories } from "@/model/Enums";
import { Button } from "@/components/ui/button"
import { FilterButton } from "./filter-button";
import { Input } from "../ui/input";

export function ProductsPage() {
    const [books, setBooks] = useState([
        {
          id: 1,
          title: "The Great Gatsby",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 2,
          title: "To Kill a Mockingbird",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 3,
          title: "1984",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 4,
          title: "Pride and Prejudice",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 5,
          title: "The Catcher in the Rye",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 6,
          title: "The Lord of the Rings",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 7,
          title: "Harry Potter and the Sorcerer's Stone",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 8,
          title: "The Hobbit",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 9,
          title: "The Hunger Games",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 10,
          title: "The Kite Runner",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 11,
          title: "The Book Thief",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 12,
          title: "The Fault in Our Stars",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 13,
          title: "The Kite Runner",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 14,
          title: "The Book Thief",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        },
        {
          id: 15,
          title: "The Fault in Our Stars",
          cover: "/placeholder.svg",
          authors: ["ABC", "Dr. R. S. Aggarwal"],
          price: 1499
        }
      ])
      const [currentPage, setCurrentPage] = useState(1)
      const booksPerPage = 8
      const totalPages = Math.ceil(books.length / booksPerPage)
      const indexOfLastBook = currentPage * booksPerPage
      const indexOfFirstBook = indexOfLastBook - booksPerPage
      const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
      const [searchTerm, setSearchTerm] = useState("");
      const handlePageChange = (page: any) => {
        setCurrentPage(page)
      }
    return (
        <section>
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">Welcome to StudyMaxx</h2>
                <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                  <Input type="text" placeholder="search by title or author or keywords" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
                  <Button type="button">Search</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-3">
                <FilterButton optionArray={subjects} name="subject" />
                <FilterButton optionArray={levels} name="clas" />
                <FilterButton optionArray={boards} name="board" />
                <FilterButton optionArray={languages} name="language" />
                <FilterButton optionArray={categories} name="categorie" />
            </div>
            <div className="container px-4 md:px-6 pt-6">
                <div className="flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {currentBooks.map((book) => (
                    <ItemCard key={book.id} title={book.title} authors={book.authors} price={book.price} cover={book.cover} />
                    ))}
                </div>
                <div className="container px-4 md:px-6 mt-8">
                    <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            className={`hover:cursor-pointer ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                            onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1);}}
                            aria-disabled={currentPage <= 1}
                            tabIndex={currentPage <= 1 ? -1 : undefined}
                        />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink className="hover:cursor-pointer" onClick={(e) => {e.preventDefault(); handlePageChange(page);}} isActive={page === currentPage}>
                            {page}
                            </PaginationLink>
                        </PaginationItem>
                        ))}
                        <PaginationItem>
                        <PaginationNext
                            className={`hover:cursor-pointer ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                            onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1);}}
                            aria-disabled={currentPage >= totalPages}
                            tabIndex={currentPage >= totalPages ? -1 : undefined}
                        />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                </div>
                </div>
            </div>
        </section>
    );
}