import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";

const API_END_POINT = "https://food-mern-stack.onrender.com/api/v1/users";
axios.defaults.withCredentials = true;

// Define the types

type User = {
  fullname: string;
  email: string;
  city: string;
  country: string;
  profilePicture: string;
  contact: string;
  address: string;
  admin: boolean;
  isVerified: boolean;
};

// in typescript | this is the intersection symbols

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // now implements signup functionality here

      signup: async (input: SignupInputState) => {
        try {
          // Set loading to true when the signup process begins
          set({ loading: true });

          const res = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.data.message) {
   
            toast.success(res.data.message);
            // Set loading to false after the API call is successful
            set({
              loading: false,
              user: res.data.user,
              isAuthenticated: true,
              isCheckingAuth: true,
            });
          }
        } catch (error: any) {
          // Set loading to false if an error occurs
          toast.error(error?.response?.data?.message || "Signup failed");
          set({ loading: false });
        }
      },
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.message) {
      
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Login failed");
          set({ loading: false });
        }
      },
      // verfiy with otp
      verifyEmail: async (verificationCode: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationCode },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "Login failed");
        }
      },

      // generally use check u have cookie token or expire for access the services token expires after 24 hour
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);

          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, isAuthenticated: false, user: null });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "Logout failed");
        }
      },

      forgetPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forget-password`,
            { email }
          );
          if (response.data.message) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error?.response?.data?.message || "Login failed");
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );

          if (response.data.message) {
            set({ loading: false });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error?.response?.data?.message || "Login failed");
        }
      },
      updateProfile: async (input: any) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.message) {
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message || "Update profile failed"
          );
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
