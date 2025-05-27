import { Book } from "@/model/Books";

export async function getSearchedAndFilteredBooks(books: Book[], searchTerm: string, subjects: string[], levels: string[], languages: string[], boards: string[], categories: string[], exams: string[] ) {
    
    const filteredSchool: Book[] = [];
    const filteredCompetitiveExams: Book[] = [];
    const filteredHigherAcedemic: Book[] = [];
    const filteredGeneralBooks: Book[] = [];
    const filteredKidsFoundation: Book[] = [];
    if(categories.includes("School")) {
        const booksFilteredBySubjects: Book[] = books.filter((book: Book) => book.category === "School")
        if((languages?.length > 0 && languages[0] !== "") 
            || (boards.length > 0 && boards[0] !== "") 
            || (levels.length > 0 && levels[0] !== "")
            || (subjects.length > 0 && subjects[0] !== "")) {
                filteredSchool.push(...booksFilteredBySubjects.filter((book: Book) => (languages && languages.length > 0 && languages[0] !== "") ? languages?.includes(book.language) : false
                            || (boards && boards.length > 0 && book.board && boards[0] !== "") ? boards?.includes(book.board) : false
                            || (levels && levels.length > 0 && book.level && levels[0] !== "") ? levels?.includes(book.level) : false
                            || (subjects && subjects.length > 0 && book.subject && subjects[0] !== "") ? subjects.includes(book.subject) : false)
                );
        } else {
            filteredSchool.push(...booksFilteredBySubjects);
        }
    }

    if(categories.includes("Competitive Exam")) {
        const booksFilteredByCompetitiveExams: Book[] = books.filter((book: Book) => book.category === "Competitive Exam")
        if((languages.length > 0 && languages[0] !== "") 
            || (exams.length > 0 && exams[0] !== "")) {
                filteredSchool.push(...booksFilteredByCompetitiveExams.filter((book: Book) => (languages && languages.length > 0 && languages[0] !== "") ? languages?.includes(book.language) : false
                            || (exams && exams.length > 0 && book.exam && exams[0] !== "") ? exams?.includes(book.exam) : false
                            
                ));
        } else {
            filteredSchool.push(...booksFilteredByCompetitiveExams);
        }
    }

    if(categories?.includes("Higher Academic Book")) {
        filteredHigherAcedemic.push(...books.filter((book: Book) => book.category === "Higher Academic Book"))
    }

    if(categories?.includes("General")) {
        filteredGeneralBooks.push(...books.filter((book: Book) => book.category === "General"));
    }

    if(categories?.includes("Kids Foundation")) {
        filteredKidsFoundation.push(...books.filter((book: Book) => book.category === "Kids Foundation"));
    }

    const allFilteredBooks = [];
    if(categories.length > 0) {
        allFilteredBooks.push(...filteredSchool, ...filteredCompetitiveExams, ...filteredGeneralBooks, ...filteredKidsFoundation, ...filteredHigherAcedemic);
    } else {
        allFilteredBooks.push(...books);
    }

    const finalBooks = allFilteredBooks
                            .filter((book: Book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) 
                                    || (book.authors?.findIndex((author) => author.name.toLowerCase().includes(searchTerm.toLowerCase())) !== -1)
                                    || (book.keywords.findIndex((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase())) !== -1)
                                );
    return finalBooks;
}