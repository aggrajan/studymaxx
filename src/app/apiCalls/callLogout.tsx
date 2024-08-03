import axios from "axios";
export const logout = async () => {
    try {
        const response = await axios.post(`/api/logout`);
    } catch(error: any) {
        console.log("logout failed");
    }
}