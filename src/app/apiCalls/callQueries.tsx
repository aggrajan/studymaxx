import axios from "axios";
export const getQuery= async () => {
    try {
        const response = await axios.get(`/api/query`);
        if(response.data.success) return response.data.response;
        return []
    } catch(error: any) {
        return [];
    }
}