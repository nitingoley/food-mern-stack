import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, Lock, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
// import { LoginInputState } from '../schema/userSchema';
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

// interface LoginInputState {
//   email: string;
//   password: string;
// }

const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  //  used zod validation  of define types strictly
  const [errors, setErrors] = useState<Partial<LoginInputState>>();
  const navigate = useNavigate();

  // now dynamic loading
  const { login, loading } = useUserStore();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginFormHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginFormHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-green-200"
      >
        <div className="mb-4">
          <h1 className="font-bold text-2xl">TastyFoods</h1>
        </div>
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
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none focus" />
            {errors && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
        </div>
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
            <Lock className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-10">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-400 hover:bg-red-500"
          >
            {loading ? (
              <>
                <Loader2 className="" /> Please Wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <div className="mt-3">
            <Link
              to={"/forget-password"}
              className="text-blue-500 hover:underline"
            >
              Forget password
            </Link>
          </div>
        </div>
        <Separator />
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 font-semi-bold">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
