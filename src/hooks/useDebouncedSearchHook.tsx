"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateSearchTerm } from "@/lib/slices/searchAndFilterSlice";
import { getSearchedAndFilteredBooks } from "@/helpers/getSearchedAndFilteredBooks";
import { setBooks } from "@/lib/slices/booksSlice";

export function useDebouncedSearch(delay = 500) {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.searchAndFilter.searchTerm);
  const filters = useAppSelector((state) => state.searchAndFilter.filters);
  const allBooks = useAppSelector((state) => state.bookStore.books);
  const [isSearching, setIsSearching] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm.trim() === "") {
      setIsSearching(false);
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      setIsSearching(true);
      getSearchedAndFilteredBooks(
        allBooks,
        searchTerm,
        filters.subject,
        filters.clas,
        filters.language,
        filters.board,
        filters.categorie,
        filters.exam
      ).then((books) => {
        dispatch(setBooks(books));
      }).finally(() => {
        setIsSearching(false);
      });
    }, delay);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm, filters,allBooks, delay, dispatch]);

  const handleSearchChange = (text: string) => {
    dispatch(updateSearchTerm(text));
  };

  return {
    isSearching,
    handleSearchChange,
    searchTerm,
  };
}
