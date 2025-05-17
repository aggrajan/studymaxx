export const getBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-books`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!res.ok) throw new Error("Failed to fetch books");

  const data = await res.json();
  return data.response;
};