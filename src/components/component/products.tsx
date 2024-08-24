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
import { clearAllFilters, updateSearchTerm } from "@/lib/slices/searchAndFilterSlice";
import { setBooks } from "@/lib/slices/booksSlice";
import { getSearchedAndFilteredBooks } from "@/helpers/getSearchedAndFilteredBooks";
import { useRouter } from "next/navigation";
import { SkeletonProductsPage } from "../skeleton-components/skeleton-products-page";
import { Label } from "../ui/label";

export function ProductsPage() {
    const router = useRouter();
    const filteredBooks = useAppSelector((state) => state.books.books)
    const searchTerm = useAppSelector((state) => state.searchAndFilter.searchTerm);
    const filters = useAppSelector((state) => state.searchAndFilter.filters)
    const dispatch = useAppDispatch();
    const allBooks = useAppSelector((state) => state.bookStore.books);
    const [books, setAllBooks] = useState<Book[]>([]);
    const [bookConfig, setBookConfig] = useState(false);

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
        setBookConfig(true);
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

    

    return (<>
        {bookConfig ? <div className="bg-gray-100"><section className="container max-w-[100rem] px-4 md:px-6">
            <div className="space-y-2 text-center">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-5">Welcome to StudyMaxx</h2>
                <div className="flex flex-col w-full max-w-sm items-start mx-auto">
                  <Input placeholder="search by title or author or keywords" className="mx-0 rounded-sm" value={searchTerm} onChange={(e) => {dispatch(updateSearchTerm(e.target.value))}} />
                  <div className="w-full">
                    <Button className="mt-3 mr-2 bg-blue-700 hover:bg-blue-800" onClick={() => { search(searchTerm); setCurrentPage(1); }}>Search</Button>
                    <Button className="mt-3 border border-black text-black bg-gray-300 hover:bg-gray-600 hover:text-white" onClick={() => { dispatch(clearAllFilters()); search(searchTerm); setCurrentPage(1); }}>Clear All Filters</Button>
                  </div>
                </div>
            </div>
            <div id="products_content" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 mx-8 sm:mx-8 md:mx-6">
                <FilterButton optionArray={categories} name="categorie" />
                {isSchoolSelected && <FilterButton optionArray={subjects} name="subject" />}
                {isSchoolSelected && <FilterButton optionArray={levels} name="clas" />}
                {isSchoolSelected && <FilterButton optionArray={boards} name="board" />}
                {(isSchoolSelected || isCompetitiveExamSelected) && <FilterButton optionArray={languages} name="language" />}
                {isCompetitiveExamSelected && <FilterButton optionArray={exams} name="exam" />}
            </div>
            <div className="md:px-6 pt-6">
                <div className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {
                  currentBooks.length === 0 ? <div className="font-medium text-red-500">No books found matching your search query</div> : currentBooks.map((book: Book) => (
                    <ItemCard key={`book_${book._id}`} book={book}/>
                  ))
                }
                </div>
                <div className="container px-4 md:px-6 mt-8 mb-24">
                    <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            className={`hover:cursor-pointer ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                            onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1); router.push("/products/#products_content") }}
                            aria-disabled={currentPage <= 1}
                            tabIndex={currentPage <= 1 ? -1 : undefined}
                        />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink className="hover:cursor-pointer" onClick={(e) => {e.preventDefault(); handlePageChange(page); router.push("/products/#products_content") }} isActive={page === currentPage}>
                            {page}
                            </PaginationLink>
                        </PaginationItem>
                        ))}
                        <PaginationItem>
                        <PaginationNext
                            className={`hover:cursor-pointer ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                            onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1); router.push("/products/#products_content") }}
                            aria-disabled={currentPage >= totalPages}
                            tabIndex={currentPage >= totalPages ? -1 : undefined}
                        />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                </div>
                </div>
            </div>
        </section></div> : <SkeletonProductsPage />}
        </>
    );
}