import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { MenuItem } from "@/types/resturantTypes";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";

const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menu
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        {menus.map((menu: MenuItem) => (
          <Card className="max-w-xs mx-auto shadow-lg overflow-hidden rounded-lg">
            <img src={menu.image} alt="" className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h1>
              <p className="mt-2 text-gray-600 text-sm">{menu.description}</p>
              <h4>
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h4>
            </CardContent>
            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  addToCart(menu);
                  navigate("/cart");
                }}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;
