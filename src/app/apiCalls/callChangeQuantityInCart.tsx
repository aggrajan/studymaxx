import axios from "axios";
export async function changeQuantityInCart(bookId: string, amount: number) {
    try {
        const response = await axios.post('/api/change-quantity-in-cart', {
            bookId: bookId,
            amount: amount
        });
        if(response.data.success) {
            return "Successfully added to cart"
        } else {
            return "Something went wrong"
        }
    } catch(error: any) {
        return error.message;
    }
}