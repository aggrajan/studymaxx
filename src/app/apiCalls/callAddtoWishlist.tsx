export async function addToWishlist(bookId: string) {
  try {
    const res = await fetch('/api/add-to-wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId }),
      cache: 'no-store', // Prevent caching for POST (default, but explicit here)
    });

    const data = await res.json();

    if (data.success) {
      return 'Successfully added to wishlist';
    } else {
      return 'Something went wrong';
    }
  } catch (error: any) {
    return error.message || 'An error occurred';
  }
}
