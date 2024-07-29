import axios from "axios";
export const getFeedbacks = async () => {
    try {
        const response = await axios.get(`/api/feedback`);
        if(response.data.success) return response.data.response;
        return []
    } catch(error: any) {
        return [];
    }
}