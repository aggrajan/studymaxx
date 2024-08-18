import axios from "axios";

export default async function getCoupons() {
    try {
        const response = await axios.get("/api/coupon");
        return response.data.response;
    } catch(error: any) {
        return [];
    }
}