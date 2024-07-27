import axios from "axios";
export async function addToWishlist(bookId: string) {
    try {
        const response = await axios.post('/api/add-to-wishlist', {
            bookId: bookId
        });
        if(response.data.success) {
            return "Successfully added to wishlist"
        } else {
            return "Something went wrong"
        }
    } catch(error: any) {
        return error.message;
    }
}