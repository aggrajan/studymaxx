export async function removeFromCart(bookId: string) {
  try {
    const res = await fetch('/api/remove-from-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });

    const data = await res.json();

    if (data.success) {
      return "Successfully removed from cart";
    } else {
      return "Something went wrong";
    }
  } catch (error: any) {
    return error.message;
  }
}
