"use server"
import { cookies } from "next/headers";

export async function checkIsTokenAvailable() {
    const token = cookies().get("isActiveToken")?.value || "";
    return token !== "";
}