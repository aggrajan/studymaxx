"use client";

import { useEffect, useState } from "react"
import { ItemCard } from "./item-card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"
import { subjects, levels, boards, languages, categories, exams } from "@/model/Enums";
import { Button } from "@/components/ui/button"
import { FilterButton } from "./filter-button";
import { Input } from "../ui/input";
import { Book } from "@/model/Books";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateSearchTerm } from "@/lib/slices/searchAndFilterSlice";
import { setBooks } from "@/lib/slices/booksSlice";
import { getSearchedAndFilteredBooks } from "@/helpers/getSearchedAndFilteredBooks";

export function ProductsPage() {
    const filteredBooks = useAppSelector((state) => state.books.books)
    const searchTerm = useAppSelector((state) => state.searchAndFilter.searchTerm);
    const filters = useAppSelector((state) => state.searchAndFilter.filters)
    const dispatch = useAppDispatch();
    const allBooks = useAppSelector((state) => state.bookStore.books);
    const [books, setAllBooks] = useState<Book[]>([]);
    useEffect(() => {
      
      const getAllBooks = async () => {
          
          if (Array.isArray(allBooks)) {
              setAllBooks(allBooks);
          } else {
              console.error("Data fetched is not an array:", allBooks);
          }
      };

      if(searchTerm === "" && filters.board.length === 0 && filters.categorie.length === 0 && filters.clas.length === 0 && filters.exam.length === 0 && filters.language.length === 0 && filters.subject.length === 0) {
        getAllBooks();
      }
    }, []);

    useEffect(() => {
      if (Array.isArray(filteredBooks)) {
          setAllBooks(filteredBooks);
      } else {
          console.error("Filtered books is not an array:", filteredBooks);
      }
  }, [filteredBooks]);
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 8
    const totalPages = Math.ceil(books.length / booksPerPage)
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
    const [isSchoolSelected, setIsSchoolSelected] = useState(false);
    const [isCompetitiveExamSelected, setIsCompetitiveExamSelected] = useState(false);

    useEffect(() => {
      if(filters.categorie.findIndex((category) => category === "School") === -1) {
        setIsSchoolSelected(false);
      } else {
        setIsSchoolSelected(true);
      }

      if(filters.categorie.findIndex((category) => category === "Competitive Exam") === -1) {
        setIsCompetitiveExamSelected(false);
      } else {
        setIsCompetitiveExamSelected(true);
      }

      search(searchTerm);
    }, [filters])

    const handlePageChange = (page: any) => {
      setCurrentPage(page)
    }

    const search = (searchText: string) => {
      (async () => {
        const books = await getSearchedAndFilteredBooks(searchText, filters.subject, filters.clas, filters.language, filters.board, filters.categorie, filters.exam);
        dispatch(setBooks(books));
      })();
    }

    

    return (
        <section className="container px-4 md:px-6">
            <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold">Welcome to StudyMaxx</h2>
                <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                  <Input type="text" placeholder="search by title or author or keywords" value={searchTerm} onChange={(e) => {dispatch(updateSearchTerm(e.target.value))}} />
                  <Button type="button" onClick={() => {
                    search(searchTerm);
                  }}>Search</Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 mx-8 sm:mx-8 md:mx-6">
                <FilterButton optionArray={categories} name="categorie" />
                {isSchoolSelected && <FilterButton optionArray={subjects} name="subject" />}
                {isSchoolSelected && <FilterButton optionArray={levels} name="clas" />}
                {isSchoolSelected && <FilterButton optionArray={boards} name="board" />}
                {(isSchoolSelected || isCompetitiveExamSelected) && <FilterButton optionArray={languages} name="language" />}
                {isCompetitiveExamSelected && <FilterButton optionArray={exams} name="exam" />}
            </div>
            <div className="container md:px-6 pt-6">
                <div className="flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {currentBooks.map((book: Book) => (
                    <ItemCard key={book._id as string} book={book} />
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