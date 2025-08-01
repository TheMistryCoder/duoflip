import { z } from "zod";

export const insertContactInquirySchema = z.object({
  contactName: z.string().min(1, "Name is required"),
  jobTitle: z.string().optional(),
  schoolName: z.string().min(1, "School name is required"),
  location: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  inquiryType: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>; 