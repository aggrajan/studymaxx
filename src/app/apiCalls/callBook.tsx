export const getBook = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-book/${id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    const data = await res.json();

    if (data.success) {
      console.log("Successfully fetched the book");
      return data.response;
    }

    console.log("Book not found");
    return data.message;

  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
};
