import axios from "axios";
export const getEveryQuery= async () => {
    try {
        const response = await axios.get(`/api/all-queries`);
        if(response.data.success) return response.data.response;
        return []
    } catch(error: any) {
        return [];
    }
}