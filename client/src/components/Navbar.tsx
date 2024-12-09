import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { Separator } from "@radix-ui/react-separator";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setTheme } = useThemeStore();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-14">
        {/* Logo */}
        <Link to={"/"}>
          <h1 className="font-bold md:font-extrabold text-2xl">FoodyTasty</h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6">
            <Link to={"/"} className="hover:text-red-500">
              Home
            </Link>
            <Link to={"/profile"} className="hover:text-red-500">
              Profile
            </Link>
            <Link to={"/order/status"} className="hover:text-red-500">
              Orders
            </Link>
          </div>

          {/* Admin Dashboard Menu */}
          {user?.admin && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="hover:text-red-500">
                  Dashboard
                </MenubarTrigger>
                <MenubarContent>
                  <Link to={"/admin/restaurant"}>
                    <MenubarItem>Restaurant</MenubarItem>
                  </Link>
                  <Link to={"/admin/menu"}>
                    <MenubarItem>Menu</MenubarItem>
                  </Link>
                  <Link to={"/admin/orders"}>
                    <MenubarItem>Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <div className="relative">
            <Link
              to={"/cart"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <ShoppingCart />
            </Link>
            {cart.length > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="User Profile" />
            <AvatarFallback>{user?.fullname}</AvatarFallback>
          </Avatar>

          {/* Logout Button */}
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Please wait...
              </>
            ) : (
              "Logout"
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// create another component for mobile design

const MobileNavbar = () => {
  const { user, logout } = useUserStore();
  const { setTheme } = useThemeStore();
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"icon"}
            className="rounded-full bg-gray-200 gray-200 text-black hover:bg-gray-200"
          >
            <Menu size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle>FoodyTasty</SheetTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SheetHeader>
          <Separator className="my-2" />
          <SheetDescription className="flex-1">
            <Link to={"/profile"}>
              <User />
              <span>Profile</span>
            </Link>
            <Link
              to={"/order/status"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-semibold"
            >
              <HandPlatter />
              <span>Orders</span>
            </Link>
            <Link
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-semibold"
              to={"/cart"}
            >
              <User />
              <span>Cart (0)</span>
            </Link>{" "}
            {user?.admin && (
              <>
                <Link
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-semibold"
                  to={"/admin/menu"}
                >
                  <SquareMenu />
                  <span>Menu</span>
                </Link>{" "}
                <Link
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-semibold"
                  to={"/admin/restaurant"}
                >
                  <UtensilsCrossed />
                  <span>Resutrant</span>
                </Link>{" "}
                <Link
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-semibold"
                  to={"/admin/orders"}
                >
                  <PackageCheck />
                  <span>Resutrant orders</span>
                </Link>
              </>
            )}
          </SheetDescription>
          <SheetFooter className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage />
                <img src={user?.profilePicture} alt="" />
              </Avatar>
              <h1 className="font-semibold">{user?.fullname}</h1>
              <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
                Logout
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
