"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setStoreBooks } from "@/lib/slices/bookStoreSlice";
import { getBooks } from "@/app/apiCalls/callBooks";

type BookContextType = {
  booksLoading: boolean;
};

const BookContext = createContext<BookContextType>({ booksLoading: true });

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [booksLoading, setBooksLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allStoreBooks = await getBooks();
        dispatch(setStoreBooks(allStoreBooks));
      } catch (error) {
        console.error("Error loading books:", error);
      } finally {
        setBooksLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ booksLoading }}>
      {children}
    </BookContext.Provider>
  );
};
