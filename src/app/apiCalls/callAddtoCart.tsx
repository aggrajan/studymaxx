export async function addToCart(bookId: string) {
  try {
    const res = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId }),
      cache: 'no-store', // Prevent caching for POST
    });

    const data = await res.json();

    if (data.success) {
      return 'Successfully added to cart';
    } else {
      return 'Something went wrong';
    }
  } catch (error: any) {
    return error.message || 'An error occurred';
  }
}
