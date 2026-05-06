import { validateAdmin } from "~/server/auth";

export async function requireAdmin(): Promise<void> {
  const result = await validateAdmin();
  if (!result.valid) {
    throw new Error("Unauthorized");
  }
}
