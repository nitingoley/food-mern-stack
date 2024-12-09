import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import {
  Contact,
  Loader2,
  LockKeyhole,
  Mail,
  PersonStandingIcon,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, loading } = useUserStore();
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setError] = useState<Partial<SignupInputState>>({});
  const navigate = useNavigate();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userSignupSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<SignupInputState>);
      return;
    }
    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signupFormHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-green-200"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">TastyFoods</h1>
        </div>

        {/* Full Name Field */}
        <div className="mb-4">
          <div className="relative">
            <Input
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              className="pl-10 focus-visible:ring-1"
              value={input.fullname}
              onChange={changeEventHandler}
            />
            <PersonStandingIcon className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors?.fullname && (
              <span className="text-sm text-red-500">{errors.fullname}</span>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <div className="relative">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 focus-visible:ring-1"
              value={input.email}
              onChange={changeEventHandler}
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors?.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <div className="relative">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10 focus-visible:ring-1"
              value={input.password}
              onChange={changeEventHandler}
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors?.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        {/* Contact Field */}
        <div className="mb-4">
          <div className="relative">
            <Input
              name="contact"
              type="text"
              placeholder="Enter your number"
              className="pl-10 focus-visible:ring-1"
              value={input.contact}
              onChange={changeEventHandler}
            />
            <Contact className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors?.contact && (
              <span className="text-sm text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-10">
          <Button
            type="submit"
            className="w-full bg-red-400 hover:bg-red-500"
            disabled={loading} // Disable button during loading to avoid multiple submissions
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" /> // Add the spinner here
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>

        <Separator />

        {/* Link to Login Page */}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semi-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
