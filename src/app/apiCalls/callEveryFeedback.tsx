import axios from "axios";
export const getEveryFeedback = async () => {
    try {
        const response = await axios.get(`/api/all-feedbacks`);
        if(response.data.success) return response.data.response;
        return []
    } catch(error: any) {
        return [];
    }
}