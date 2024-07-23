import axios from "axios";
export const getProfile =async () => {
    try {
        const response = await axios.post(`/api/profile`);
        return response.data.response;
    } catch(error: any) {
        return null;
    }
}