import Login from "./auth/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// import MainLayout from "./MainLayout";
import Signup from "./auth/Signup";
import ForgetPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetails from "./components/RestaurantDetails";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import React, { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import LoadingScreen from "./components/Loading";
import { useThemeStore } from "./store/useThemeStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (!user?.admin) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },

      // admin pages here's
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Restaurant />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },

      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            {" "}
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
    ),
  },

  {
    path: "/forget-password",
    element: (
      <AuthenticatedUser>
        <ForgetPassword />
      </AuthenticatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);
function App() {
  const { isCheckingAuth, checkAuthentication } = useUserStore();
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <LoadingScreen />;

  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
