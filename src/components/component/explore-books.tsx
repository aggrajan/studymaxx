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
            if(allBooks.length > 0) setBooksConfig(true);
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
  }, []);

  useEffect(() => {
    if (Array.isArray(filteredBooks)) {
        setAllBooks(filteredBooks);
    } else {
        console.error("Filtered books is not an array:", filteredBooks);
    }
  }, [filteredBooks]);
  
  const handlePageChange = (page: any) => {
    setCurrentPage(page)
  } 
  
  const search = (searchText: string) => {
    (async () => {
      const books = await getSearchedAndFilteredBooks(searchText, searchAndFilterState.filters.subject, searchAndFilterState.filters.clas, searchAndFilterState.filters.language, searchAndFilterState.filters.board, searchAndFilterState.filters.categorie, searchAndFilterState.filters.exam);
      dispatch(setBooks(books));
    })();
  }

  return (<>
    {booksConfig ? <section id="content" className="mx-auto max-w-[100rem] pt-7 bg-background">
      <div className="px-4 md:px-6 gap-8 pb-4 text-center mb-0 sm:mb-5 md:mb-8 lg:mb-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Explore Our Products</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
          Discover our top-selling and most popular books across various genres.
        </p>
      </div>
      <div className="px-4 md:px-6 grid md:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] gap-8">
        <div className="flex flex-col gap-4">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Search for books by title.</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Type title, author, keywords..."
                value={searchAndFilterState.searchTerm}
                onChange={(e) => {
                    dispatch(updateSearchTerm(e.target.value))
                  }
                }
              />
              <div className="flex flex-row gap-2">
                <Button className="mt-2" onClick={() => { search(searchAndFilterState.searchTerm); setCurrentPage(1); }}>Search</Button>
                <Button className="mt-2" onClick={() => { dispatch(clearAllFilters()); search(""); setCurrentPage(1); }}>Clear All Filters</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Filter books by Type of Book.</CardTitle>
            </CardHeader>
            <CardContent>
              {categories.map((category, index) => (<div className="flex items-center space-x-2 my-2" key={`category_${index}`}>
                <Checkbox id={category} 
                checked={searchAndFilterState.filters.categorie.includes(category)} 
                onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "categorie", value: category})) : dispatch(clearAllFilters()))}
                disabled={searchAndFilterState.filters.categorie.length > 0 && !searchAndFilterState.filters.categorie.includes(category)} />
                <label
                htmlFor={category}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {category}
                </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {isSchoolSelected && <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Filter books by Subjects.</CardTitle>
            </CardHeader>
            <CardContent>
              {subjects.map((subject, index) => (<div className="flex items-center space-x-2 my-2" key={`subject_${index}`}>
                <Checkbox id={subject} checked={searchAndFilterState.filters.subject.includes(subject)} onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "subject", value: subject})) : dispatch(removeFilter({name: "subject", value: subject})))} />
                <label
                htmlFor={subject}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {subject}
                </label>
                </div>
              ))}
            </CardContent>
          </Card>}

          {isSchoolSelected && <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Filter books by Board.</CardTitle>
            </CardHeader>
            <CardContent>
              {boards.map((board, index) => (<div className="flex items-center space-x-2 my-2" key={`board${index}`}>
                <Checkbox id={board} checked={searchAndFilterState.filters.board.includes(board)} onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "board", value: board})) : dispatch(removeFilter({name: "board", value: board})))} />
                <label
                htmlFor={board}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {board}
                </label>
                </div>
              ))}
            </CardContent>
          </Card>}

          {(isSchoolSelected || isCompetitiveExamSelected) && <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Filter books by Language.</CardTitle>
            </CardHeader>
            <CardContent>
              {languages.map((language, index) => (<div className="flex items-center space-x-2 my-2" key={`language_${index}`}>
                <Checkbox id={language} checked={searchAndFilterState.filters.language.includes(language)} onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "language", value: language})) : dispatch(removeFilter({name: "language", value: language})))} />
                <label
                htmlFor={language}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {language}
                </label>
                </div>
              ))}
            </CardContent>
          </Card>}

          {isCompetitiveExamSelected && <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Filter books by Exam Type.</CardTitle>
            </CardHeader>
            <CardContent>
              {exams.map((exam, index) => (<div className="flex items-center space-x-2 my-2" key={`exam_${index}`}>
                <Checkbox id={exam} checked={searchAndFilterState.filters.exam.includes(exam)} onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "exam", value: exam})) : dispatch(removeFilter({name: "exam", value: exam})))} />
                <label
                htmlFor={exam}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {exam}
                </label>
                </div>
              ))}
            </CardContent>
          </Card>}

          {isSchoolSelected && <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Filter books by Class.</CardTitle>
            </CardHeader>
            <CardContent>
              {levels.map((level, index) => (<div className="flex items-center space-x-2 my-2" key={`level_${index}`}>
                <Checkbox id={level} checked={searchAndFilterState.filters.clas.includes(level)} onCheckedChange={(checked) => (checked ? dispatch(addFilter({name: "clas", value: level})) : dispatch(removeFilter({name: "clas", value: level})))} />
                <label
                htmlFor={level}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  {level}
                </label>
                </div>
              ))}
            </CardContent>
          </Card>}

        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {
              currentBooks.length === 0 ? <div className="font-medium text-red-500">No books found matching your search query</div> : currentBooks.map((book: Book) => (
                <ItemCard key={`book_${book._id}`} book={book}/>
              ))
            }
          </div>
          <div className="container px-4 md:px-6 mt-8" id="pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`hover:cursor-pointer ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
                    onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1); router.push("/#content")}}
                    aria-disabled={currentPage <= 1}
                    tabIndex={currentPage <= 1 ? -1 : undefined}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
                  <PaginationItem key={`page_${index}`}>
                    <PaginationLink className="hover:cursor-pointer" onClick={(e) => {e.preventDefault(); handlePageChange(page); router.push("/#content")}} isActive={page === currentPage}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className={`hover:cursor-pointer ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                    onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1); router.push('/#content')}}
                    aria-disabled={currentPage >= totalPages}
                    tabIndex={currentPage >= totalPages ? -1 : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
        
      </div>
      
      
    </section> : <SkeleltonExploreBooks />}</>
  )
}