import { cookies } from "next/headers";
import crypto from "crypto";

export async function ManageCookie() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("todo_session");

  if (!sessionId) {
    const id = crypto.randomUUID();

    cookieStore.set("todo_session", id, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return id;
  }

  return sessionId.value;
}
