/**
 * Branded ULID type — prevents accidentally passing a slug, name, or random
 * string where a ULID is expected. The runtime is just a regex check; the
 * compile-time gain is the nominal-typed `Ulid` brand.
 */
import { z } from "zod";

const ULID_RE = /^[0-9A-HJKMNP-TV-Z]{26}$/i;

export const UlidSchema = z.string().regex(ULID_RE, { message: "Invalid ULID" }).brand<"Ulid">();

export type Ulid = z.infer<typeof UlidSchema>;
