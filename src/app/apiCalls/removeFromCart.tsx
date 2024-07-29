import axios from "axios";
export async function removeFromCart(bookId: string) {
    try {
        const response = await axios.post('/api/remove-from-cart', {
            bookId: bookId
        });
        if(response.data.success) {
            return "Successfully removed from cart"
        } else {
            return "Something went wrong"
        }
    } catch(error: any) {
        return error.message;
    }
}