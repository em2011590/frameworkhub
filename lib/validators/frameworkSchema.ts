import { z } from "zod";

export const frameworkSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  category: z.enum(["frontend", "backend", "fullstack", "mobile", "css", "testing", "devops"]),
  logo: z.string().url().optional(),
  color: z.string().optional(),
  description: z.string().min(10).max(500),
  longDescription: z.string().optional(),
  level: z.array(z.enum(["junior", "mid", "senior"])).min(1),
  tags: z.array(z.string()).default([]),
  language: z.string().default("JavaScript"),
  stars: z.number().min(0).default(0),
  weeklyDownloads: z.number().min(0).default(0),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  officialDocs: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
});

export const reviewSchema = z.object({
  framework: z.string().min(1),
  rating: z.number().min(1).max(5),
  body: z.string().min(10).max(2000),
});

export type FrameworkInput = z.infer<typeof frameworkSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
