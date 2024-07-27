import axios from "axios";
export async function removeFromWishlist(bookId: string) {
    try {
        const response = await axios.post('/api/remove-from-wishlist', {
            bookId: bookId
        });
        if(response.data.success) {
            return "Successfully removed from wishlist"
        } else {
            return "Something went wrong"
        }
    } catch(error: any) {
        return error.message;
    }
}