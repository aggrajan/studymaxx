import axios from "axios";
export const logout = async () => {
    try {
        const response = await axios.post(`/api/logout`);
        console.log(response.data);
    } catch(error: any) {
        console.log("logout failed");
    }
}