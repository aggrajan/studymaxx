import axios from "axios"
export const getBook = async (id: string) => {
    try {
        const response = await axios.get(`/api/get-book/${id}`);
        if(response.data.success) {
            return response.data.response
        }
        return response.data.message;
    } catch(error) {
        return null;
    }
}