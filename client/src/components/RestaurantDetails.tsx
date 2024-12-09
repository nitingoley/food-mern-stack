import { Timer } from "lucide-react";
import { Badge } from "./ui/badge";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const RestaurantDetails = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useRestaurantStore(); 

  useEffect(() => {
    getSingleRestaurant(params.id!);
  }, [params.id]);
  return (
    <div className="nax-w-6xl mx-auto my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-72">
          <img
            src={singleRestaurant?.imageUrl || "Loading wait..."}
            alt="restaurant image"
            className="object-cover w-full h-full  rounded-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h2 className="font-bold text-xl">
              {singleRestaurant?.restaurantName}
            </h2>
            <div className="flex gap-2 my-2">
              {singleRestaurant?.cuisines.map(
                (cuisine: string, idx: number) => (
                  <Badge key={idx}>{cuisine}</Badge>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h3 clat-medissName="flex items-center gap-2 fonum">
                  Delivery Time:
                  <span className="text-[#D19254]">
                    {singleRestaurant?.deliveryTime} mins
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <AvailableMenu menus= {singleRestaurant?.menus!}/>
      </div>
    </div>
  );
};

export default RestaurantDetails;
