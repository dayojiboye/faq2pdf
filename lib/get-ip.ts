import "server-only";
import { headers } from "next/headers";

export async function getIp() {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  return forwardedFor ?? "0.0.0.0";
}
