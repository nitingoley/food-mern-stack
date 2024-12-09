import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartTypes";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    decrementQuantity,
    incrementQuantity,
    clearCart,
    removeFromTheCart,
  } = useCartStore();

  // calculate total using reduce
  let totalAmount = cart.reduce((acc, ele) => {
    return acc + ele.price * ele.quantity;
  }, 0);

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button onClick={() => clearCart()} variant="link">
          Clear all
        </Button>
      </div>
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src={item.image} alt="Biryani" />
                  <AvatarFallback>NG</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>
                <div className="w-fit  flex items-center rounded-full  border border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    className="rounded-full bg-gray-200"
                    variant="outline"
                    size="icon"
                  >
                    <Minus />
                  </Button>
                  <span className="font-bold text-center">{item.quantity}</span>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    className="rounded-full bg-[#D19254]"
                    variant="outline"
                    size="icon"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>₹{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => removeFromTheCart(item._id)}
                  className="bg-red-500 hover:bg-red-600"
                  size="sm"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-2xl font-bold">
              Total
            </TableCell>
            <TableCell colSpan={2} className="text-right font-bold">
              {totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button
          onClick={() => setOpen(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          Proceed to checkout
        </Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
