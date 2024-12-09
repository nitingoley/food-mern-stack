import { CheckoutSessionRequest, OrderState } from "@/types/order";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "https://food-mern-stack.onrender.com/api/v1/order";
axios.defaults.withCredentials = true;

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckOutSession: async (
        checkoutSession: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSession,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
          set({ loading: false });
        } catch (error: any) {
          // Log and handle the error
          console.error(
            "Failed to create checkout session:",
            error.response?.data?.message || error.message || error
          );
        } finally {
          // Ensure loading state is reset no matter what happens
          set({ loading: false });
        }
      },
      getOrdersDetails: async () => {},
    }),
    {
      name: "order-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
