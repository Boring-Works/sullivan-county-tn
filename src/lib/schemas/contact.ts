import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name too long"),
  email: z.string().email("Valid email is required").max(320, "Email too long"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(1, "Message is required").max(5000, "Message too long"),
  website: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
