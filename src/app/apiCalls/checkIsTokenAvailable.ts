"use server";
import { cookies } from "next/headers";

export async function checkIsTokenAvailable() {
  const token = cookies().get("token")?.value;
  return typeof token === "string" && token.length > 0;
}
