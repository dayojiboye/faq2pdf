import "server-only";
import { headers } from "next/headers";

export async function getIp() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  return forwardedFor?.split(",")[0] ?? realIp ?? "0.0.0.0";
}
