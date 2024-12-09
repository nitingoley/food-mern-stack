import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Menu name is required !" }),
  description: z
    .string()
    .nonempty({ message: "Menu description is required " }),
  price: z.number().min(0, { message: "Price not an negative value" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});

export type MenuFormSchema = z.infer<typeof menuSchema>;
