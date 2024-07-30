import axios from "axios";
export const getBooks = async () => {
    try {
        const response = await axios.get(`/api/get-books`);
        return response.data.response;
    } catch(error: any) {
        return [];
    }
}