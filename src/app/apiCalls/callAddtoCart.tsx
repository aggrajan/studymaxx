import axios from "axios";
export async function addToCart(bookId: string) {
    try {
        const response = await axios.post('/api/add-to-cart', {
            bookId: bookId
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