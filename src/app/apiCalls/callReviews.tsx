import axios from "axios"
export const getReviews = async (id: string) => {
    try {
        const response = await axios.get(`/api/get-reviews/${id}`);
        if(response.data.success) {
            return response.data.response
        }
        return response.data.message;
    } catch(error) {
        return [];
    }
}