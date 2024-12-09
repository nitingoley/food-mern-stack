import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { CheckoutSessionRequest } from "@/types/order";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

interface CheckoutConfirmPageProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CheckoutConfirmPage: React.FC<CheckoutConfirmPageProps> = ({
  open,
  setOpen,
}) => {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { createCheckOutSession, loading } = useOrderStore();

  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact.toString() || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const checkoutHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };
     
      await createCheckOutSession(checkoutData);
    } catch (error) {
      
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent>
        <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
        <DialogDescription className="mb-4">
          Double-check your delivery details and ensure everything is in order.
          When you are ready, hit confirm to finalize your order.
        </DialogDescription>
        <form id="checkout-form" onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              id="email"
              type="email"
              name="email"
              value={input.email}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
              placeholder="Enter your address"
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
              placeholder="Enter your city"
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
              placeholder="Enter your country"
            />
          </div>
        </form>
        <DialogFooter>
          {loading ? (
            <Button disabled className="bg-red-500 hover:bg-red-600">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" form="checkout-form" className="bg-red-500 hover:bg-red-600">
              Continue To Payment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
