import OrderImage from "@/assets/pexels-ufukiseloglu-29481861.jpg";
import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Success = () => {
  const orders = [1, 2, 4];
  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-100">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-lg w-full p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Orders Status :{" "}
            <span className="text-[#ff5A5A]">{"confirm".toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Order Summary
          </h2>

          {/* order items display here   */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={OrderImage}
                  alt="Order Image"
                  className="h-14 w-14 rounded-md object-cover"
                />
                <h3 className=" ml-4 text-gray-800 dark:text-gray-200 font-medium">
                  Zinger Burger
                </h3>
              </div>
              <div className="text-right">
                <IndianRupee />
                <span className="text-lg font-medium">75</span>
              </div>
            </div>
            <Separator className="my-5" />
            <Link to={"/cart"}>
              <Button className="bg-red-500 hover:bg-red-600 w-full shadow-lg py-3">
                Continue Shoping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
