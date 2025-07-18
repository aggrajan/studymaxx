"use client"
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { subjects, levels, boards, languages, categories, exams } from "@/model/Enums";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { ItemCard } from "./item-card";
import { Book } from "@/model/Books";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addFilter, updateSearchTerm, removeFilter, clearAllFilters } from "@/lib/slices/searchAndFilterSlice";
import { getSearchedAndFilteredBooks } from "@/helpers/getSearchedAndFilteredBooks";
import { setBooks } from "@/lib/slices/booksSlice";
import { useRouter } from "next/navigation";
import { SkeleltonExploreBooks } from "../skeleton-components/skeleton-explore-books";

export function ExploreBooks() {
  const router = useRouter();
  const filteredBooks = useAppSelector((state) => state.books.books);
  const dispatch = useAppDispatch();
  const searchAndFilterState = useAppSelector((state) => state.searchAndFilter) 
  const [books, setAllBooks] = useState<Book[]>([]);
  const allBooks = useAppSelector((state) => state.bookStore.books);
  const [booksConfig, setBooksConfig] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 8
  const totalPages = Math.ceil(books.length / booksPerPage)
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);
  const [isCompetitiveExamSelected, setIsCompetitiveExamSelected] = useState(false);
  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  } 
  
  const search = (searchText: string) => {
    (async () => {
      const books = await getSearchedAndFilteredBooks(allBooks, searchText, searchAndFilterState.filters.subject, searchAndFilterState.filters.clas, searchAndFilterState.filters.language, searchAndFilterState.filters.board, searchAndFilterState.filters.categorie, searchAndFilterState.filters.exam);
      dispatch(setBooks(books));
    })();
  }


  useEffect(() => {
    if(searchAndFilterState.filters.categorie.findIndex((category) => category === "School") === -1) {
      setIsSchoolSelected(false);
    } else {
      setIsSchoolSelected(true);
    }

    if(searchAndFilterState.filters.categorie.findIndex((category) => category === "Competitive Exam") === -1) {
      setIsCompetitiveExamSelected(false);
    } else {
      setIsCompetitiveExamSelected(true);
    }

    search(searchAndFilterState.searchTerm);
    setCurrentPage(1);
  }, [searchAndFilterState.filters])

  useEffect(() => {
    const getAllBooks = async () => {
        if (Array.isArray(allBooks)) {
            setAllBooks(allBooks);
            setBooksConfig(true);
        } else {
            console.error("Data fetched is not an array:", allBooks);
        }
    };

    if(searchAndFilterState.searchTerm === "" && searchAndFilterState.filters.board.length === 0
      && searchAndFilterState.filters.categorie.length === 0 && searchAndFilterState.filters.clas.length === 0 
      && searchAndFilterState.filters.exam.length === 0 && searchAndFilterState.filters.language.length === 0 
      && searchAndFilterState.filters.subject.length === 0
    ) {
      getAllBooks();
    }
  }, [allBooks, searchAndFilterState.filters.board.length, searchAndFilterState.filters.categorie.length, searchAndFilterState.filters.clas.length, searchAndFilterState.filters.exam.length, searchAndFilterState.filters.language.length, searchAndFilterState.filters.subject.length, searchAndFilterState.searchTerm]);

  useEffect(() => {
    if (Array.isArray(filteredBooks)) {
        setAllBooks(filteredBooks);
    } else {
        console.error("Filtered books is not an array:", filteredBooks);
    }
  }, [filteredBooks]);
  
  
  return (<>
    {booksConfig ? <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <section id="content" className="relative mx-auto max-w-[100rem] pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20">
        <div className="px-4 md:px-6 gap-8 pb-8 text-center mb-8 md:mb-12">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Explore Our Products
            </h2>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto font-medium">
              Discover our newly launched series of
            </p>
            <p className="max-w-[700px] text-gray-600 md:text-xl mx-auto font-medium">
              Exam Oriented Study Material
            </p>
          </div>
        </div>
        
        <div className="px-4 md:px-6 grid md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr] gap-8">
          <div className="flex flex-col gap-6">
            <Card className="rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <SearchIcon className="h-4 w-4 text-white" />
                  </div>
                  Search Books
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Type title, author, keywords..."
                  value={searchAndFilterState.searchTerm}
                  onChange={(e) => {
                      dispatch(updateSearchTerm(e.target.value))
                    }
                  }
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105" 
                    onClick={() => { search(searchAndFilterState.searchTerm); setCurrentPage(1); }}
                  >
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105" 
                    onClick={() => { dispatch(clearAllFilters()); search(""); setCurrentPage(1); }}
                  >
                    <ClearIcon className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {isSchoolSelected && <Card className="rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-md"></div>
                  Filter by Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjects.map((subject, index) => (
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" key={`subject_${index}`}>
                    <Checkbox 
                      id={subject} 
                      checked={searchAndFilterState.filters.subject.includes(subject)} 
                      onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "subject", value: subject})) : dispatch(removeFilter({name: "subject", value: subject})))}
                      className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label
                      htmlFor={subject}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                      {subject}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>}

            {isSchoolSelected && <Card className="rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md"></div>
                  Filter by Board
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {boards.map((board, index) => (
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" key={`board${index}`}>
                    <Checkbox 
                      id={board} 
                      checked={searchAndFilterState.filters.board.includes(board)} 
                      onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "board", value: board})) : dispatch(removeFilter({name: "board", value: board})))}
                      className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label
                      htmlFor={board}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                      {board}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>}

            {(isSchoolSelected || isCompetitiveExamSelected) && <Card className="rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-md"></div>
                  Filter by Language
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {languages.map((language, index) => (
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" key={`language_${index}`}>
                    <Checkbox 
                      id={language} 
                      checked={searchAndFilterState.filters.language.includes(language)} 
                      onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "language", value: language})) : dispatch(removeFilter({name: "language", value: language})))}
                      className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label
                      htmlFor={language}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                      {language}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>}

            {isCompetitiveExamSelected && <Card className="rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md"></div>
                  Filter by Exam Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {exams.map((exam, index) => (
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" key={`exam_${index}`}>
                    <Checkbox 
                      id={exam} 
                      checked={searchAndFilterState.filters.exam.includes(exam)} 
                      onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "exam", value: exam})) : dispatch(removeFilter({name: "exam", value: exam})))}
                      className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label
                      htmlFor={exam}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                      {exam}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>}

            {isSchoolSelected && <Card className="rounded-2xl border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md"></div>
                  Filter by Class
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {levels.map((level, index) => (
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200" key={`level_${index}`}>
                    <Checkbox 
                      id={level} 
                      checked={searchAndFilterState.filters.clas.includes(level)} 
                      onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "clas", value: level})) : dispatch(removeFilter({name: "clas", value: level})))}
                      className="border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <label
                      htmlFor={level}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1">
                      {level}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>}
          </div>
          
          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {
                currentBooks.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                      <SearchIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold text-gray-600">No books found</h3>
                      <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105" 
                      onClick={() => { dispatch(clearAllFilters()); search(""); setCurrentPage(1); }}
                    >
                      <ClearIcon className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                ) : currentBooks.map((book: Book) => (
                  <ItemCard key={`book_${book._id}`} book={book}/>
                ))
              }
            </div>
            
            {currentBooks.length > 0 && (
              <div className="container px-4 md:px-6 mt-12" id="pagination">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          className={`hover:cursor-pointer rounded-xl font-semibold transition-all duration-200 ${currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:scale-105 hover:shadow-lg"}`}
                          onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1); router.push("/#content")}}
                          aria-disabled={currentPage <= 1}
                          tabIndex={currentPage <= 1 ? -1 : undefined}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
                        <PaginationItem key={`page_${index}`}>
                          <PaginationLink 
                            className="hover:cursor-pointer rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg" 
                            onClick={(e) => {e.preventDefault(); handlePageChange(page); router.push("/#content")}} 
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          className={`hover:cursor-pointer rounded-xl font-semibold transition-all duration-200 ${currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:scale-105 hover:shadow-lg"}`}
                          onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1); router.push('/#content')}}
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
      </div>
      </section>
    </div> : <SkeleltonExploreBooks />}</>
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
