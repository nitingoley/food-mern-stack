import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 , Lock} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading: boolean = false;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Enter your new password to reset password
          </p>
        </div>
        <div className="relative">
          <Input
            type= "password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your password"
            className="pl-10"
          />
          <Lock className="absolute inset-y-1 left-2 text-gray-600 pointer-events-none" />
        </div>
        {loading ? (
          <Button 
          className="w-full bg-red-500 hover:bg-red-600"
          type="submit" disabled={loading}>
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button className="w-full bg-red-500 hover:bg-red-600">
            Reset Password
          </Button>
        )} 
        <span>
            Back to {" "}
            <Link to={"/login"} className="text-blue-500">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
