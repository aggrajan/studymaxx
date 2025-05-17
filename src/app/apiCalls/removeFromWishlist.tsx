export async function removeFromWishlist(bookId: string) {
  try {
    const res = await fetch('/api/remove-from-wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });

    const data = await res.json();

    if (data.success) {
      return "Successfully removed from wishlist";
    } else {
      return "Something went wrong";
    }
  } catch (error: any) {
    return error.message;
  }
}
