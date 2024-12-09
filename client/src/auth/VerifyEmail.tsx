import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);

  const { loading, verifyEmail } = useUserStore();

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value !== "" && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // convert array to string
    try {
      const verificationCode = otp.join("");
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      setError("error")
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col border-gray-500 gap-10">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Verify Email Address</h1>
          <p className="text-sm text-gray-600">
            Enter the 6-digit code to verify your email address
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter, ind) => (
              <Input
                key={ind}
                ref={(el) => (inputRef.current[ind] = el)}
                type="text"
                value={letter}
                maxLength={1}
                onChange={(e) => handleChange(ind, e.target.value)}
                onKeyDown={(e) => handleKeyDown(ind, e)}
                aria-label={`OTP digit ${ind + 1}`}
                className="md:w-12 md:h-12 w-8 h-8 text-center font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {loading ? (
            <Button
              disabled
              className="bg-red-500 hover:bg-red-600 mt-6 w-full"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600 mt-6 w-full"
            >
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
