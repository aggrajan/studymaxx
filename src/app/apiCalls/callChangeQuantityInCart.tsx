export async function changeQuantityInCart(bookId: string, amount: number) {
  try {
    const res = await fetch('/api/change-quantity-in-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId, amount }),
      cache: 'no-store', // Prevent caching for POST requests
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
