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
import { Search, Filter, Grid, List } from "lucide-react";

export function ProductsPage() {
    const router = useRouter();
    const filteredBooks = useAppSelector((state) => state.books.books)
    const searchTerm = useAppSelector((state) => state.searchAndFilter.searchTerm);
    const filters = useAppSelector((state) => state.searchAndFilter.filters)
    const dispatch = useAppDispatch();
    const allBooks = useAppSelector((state) => state.bookStore.books);
    const [books, setAllBooks] = useState<Book[]>([]);
    const [bookConfig, setBookConfig] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    
    const handlePageChange = (page: any) => {
      setCurrentPage(page)
    }

    const search = (searchText: string) => {
      (async () => {
        const books = await getSearchedAndFilteredBooks(allBooks, searchText, filters.subject, filters.clas, filters.language, filters.board, filters.categorie, filters.exam);
        dispatch(setBooks(books));
      })();
    }

    useEffect(() => {
      
      const getAllBooks = async () => {
          
          if (Array.isArray(allBooks)) {
              setAllBooks(allBooks);
          } else {
              setAllBooks([]);
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
    }, [filters]);

    return (<>
        {bookConfig ? <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden min-h-screen">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <section className="relative container max-w-[100rem] px-4 md:px-6 pt-8 pb-16">
                {/* Header Section */}
                <div className="text-center space-y-6 mb-12">
                    <div className="relative inline-block">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Begin Your Search Here
                        </h2>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                    </div>
                    <p className="max-w-2xl text-slate-600 md:text-xl mx-auto font-medium leading-relaxed">
                        Discover the perfect books for your educational journey
                    </p>
                </div>

                {/* Search Section */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-2xl transform rotate-1"></div>
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-slate-200/50">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Search className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Search Books</h3>
                                    <p className="text-slate-600">Find your perfect study companion</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input 
                                        placeholder="Search by title, author, or keywords..." 
                                        className="pl-10 border-2 border-slate-200 focus:border-blue-500 rounded-xl h-12 transition-all duration-200 bg-white/80" 
                                        value={searchTerm} 
                                        onChange={(e) => {dispatch(updateSearchTerm(e.target.value))}} 
                                    />
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button 
                                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                                        onClick={() => { search(searchTerm); setCurrentPage(1); }}
                                    >
                                        <Search className="h-4 w-4 mr-2" />
                                        Search Books
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="flex-1 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105" 
                                        onClick={() => { dispatch(clearAllFilters()); search(""); setCurrentPage(1); }}
                                    >
                                        <Filter className="h-4 w-4 mr-2" />
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-8">
                    {/* Results Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-2xl font-bold text-slate-800">
                                {currentBooks.length === 0 ? "No Results Found" : `${books.length} Books Found`}
                            </h3>
                            {books.length > 0 && (
                                <div className="text-slate-600">
                                    Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, books.length)} of {books.length}
                                </div>
                            )}
                        </div>
                        
                        {books.length > 0 && (
                            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-slate-200/50">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="rounded-lg"
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="rounded-lg"
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Books Grid/List */}
                    <div className="relative">
                        {currentBooks.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-blue-600/5 rounded-3xl transform -rotate-1"></div>
                                    <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-slate-200/50 max-w-md mx-auto">
                                        <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-700 mb-4">No Books Found</h3>
                                        <p className="text-slate-600 mb-6">Try adjusting your search terms or clear all filters to see more results.</p>
                                        <Button 
                                            variant="outline" 
                                            className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105" 
                                            onClick={() => { dispatch(clearAllFilters()); search(""); setCurrentPage(1); }}
                                        >
                                            <Filter className="h-4 w-4 mr-2" />
                                            Clear All Filters
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`grid gap-6 md:gap-8 ${
                                viewMode === 'grid' 
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                                    : 'grid-cols-1'
                            }`}>
                                {currentBooks.map((book: Book) => (
                                    <div key={`book_${book._id}`} className="transform transition-all duration-300 hover:scale-105">
                                        <ItemCard book={book} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {currentBooks.length > 0 && totalPages > 1 && (
                        <div className="flex justify-center mt-12">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                className={`hover:cursor-pointer rounded-xl font-semibold transition-all duration-200 ${
                                                    currentPage <= 1 
                                                        ? "pointer-events-none opacity-50" 
                                                        : "hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                                                }`}
                                                onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1); router.push("/products/#products_content")}}
                                                aria-disabled={currentPage <= 1}
                                                tabIndex={currentPage <= 1 ? -1 : undefined}
                                            />
                                        </PaginationItem>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <PaginationItem key={page}>
                                                <PaginationLink 
                                                    className="hover:cursor-pointer rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg" 
                                                    onClick={(e) => {e.preventDefault(); handlePageChange(page); router.push("/products/#products_content")}} 
                                                    isActive={page === currentPage}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext
                                                className={`hover:cursor-pointer rounded-xl font-semibold transition-all duration-200 ${
                                                    currentPage >= totalPages 
                                                        ? "pointer-events-none opacity-50" 
                                                        : "hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                                                }`}
                                                onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1); router.push("/products/#products_content")}}
                                                aria-disabled={currentPage >= totalPages}
                                                tabIndex={currentPage >= totalPages ? -1 : undefined}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div> : <SkeletonProductsPage />}
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

const ClearIcon = ({ className = "", strokeWidth = 1.5}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor" // Uses current text color for stroke
      strokeWidth={strokeWidth}
      className={className}
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <path
          d="M7.50006 5.5L4.05262 10.7909C3.71387 11.3107 3.69732 11.9772 4.00984 12.5133L7.50006 18.5H18.8588C19.7651 18.5 20.4999 17.7653 20.4999 16.8589V7.14109C20.4999 6.23474 19.7651 5.5 18.8588 5.5H7.50006Z"

          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 8.5L17 15.5"

          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 15.5L16.9303 8.49996"

          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};