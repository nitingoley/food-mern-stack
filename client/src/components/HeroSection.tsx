import  { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import PizzImage from "../assets/hero_pizza.png";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [serachText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col max-w-7xl  justify-center m-4 gap-20 rounded-lg items-center md:p-10 mx-auto md:flex-row">
      <div className="flex flex-col gap-10 md:w-[40%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Hungry? Let’s Get Cooking and Delivering!
          </h1>
          <p className="text-gray-500">
            Fresh ingredients, mouthwatering recipes, and speedy delivery—every
            time.
          </p>
        </div>
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={serachText}
            placeholder= "Search resturant by name, city & country"
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 border-2 h-12 shadow-lg"
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button  onClick={()=>navigate(`/search/${serachText}`)} className="bg-red-500 hover:bg-red-600">Search</Button>
        </div>
        {/* bg image  */}
        <div>
          <img
            src={PizzImage}
            alt=""
            className="object-cover w-full max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
