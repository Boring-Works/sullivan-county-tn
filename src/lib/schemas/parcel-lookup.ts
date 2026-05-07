import { z } from "zod";

export const parcelLookupSchema = z.object({
  query: z
    .string()
    .trim()
    .min(3, "Type at least 3 characters")
    .max(120, "Search is too long")
    .regex(/^[A-Za-z0-9 .,'#&\-/]+$/, "Use letters, numbers, spaces, and . , ' # & - / only"),
});

export type ParcelLookupInput = z.infer<typeof parcelLookupSchema>;
