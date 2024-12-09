import { z } from "zod";


export const userSignupSchema = z.object({
    fullname: z.string().min(3, "Full Name")
    , email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be 6 characters"),
    contact: z.string().min(10, "Contact  number must be 10 digits")
})

export type SignupInputState = z.infer<typeof userSignupSchema>;


// for login schema validation 


export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password at least 6 character")
})


export type LoginInputState = z.infer<typeof userLoginSchema>;