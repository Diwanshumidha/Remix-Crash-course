import { z } from "zod";

export const AddLinksSchema = z.object({
  title: z.string().min(5, { message: "Minimum Length is 5 letters" }),
  content: z.string().max(200),
});

export const LinksSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string().min(5, { message: "Minimum Length is 5 letters" }),
    content: z.string().max(200),
  })
);

export type Note = z.infer<typeof AddLinksSchema> & { id: string };
