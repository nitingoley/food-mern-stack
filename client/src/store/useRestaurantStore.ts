import { Orders } from "@/types/order";
import { MenuItem, RestaurantState } from "../types/resturantTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// API endpoint
const API_END_POINT = "http://localhost:4000/api/v1/restaurant";
axios.defaults.withCredentials = true;

// export const useRestaurantStore = create<RestaurantState>()(
//   persist(
//     (set) => ({
//       loading: false,
//       restaurant: null,
//       searchedRestaurant: null,
//       appliedFilter: [],
//       singleRestaurant: null,
//       restaurantOrder: [],

//       createRestaurant: async (formData: FormData) => {
//         try {
//           set({ loading: true });
//           const response = await axios.post(`${API_END_POINT}/`, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//           if (response.data.success) {
//             toast.success(response.data.message);
//           }
//         } catch (error: any) {
//           toast.error(error.response?.data?.message || "Something went wrong");
//         } finally {
//           set({ loading: false });
//         }
//       },

//       updateRestaurant: async (formData: FormData) => {
//         try {
//           set({ loading: true });
//           const response = await axios.put(`${API_END_POINT}/`, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//           if (response.data.success) {
//             toast.success(response.data.message);
//           }
//         } catch (error: any) {
//           toast.error(error.response?.data?.message || "Something went wrong");
//         } finally {
//           set({ loading: false });
//         }
//       },

//       getRestaurant: async () => {
//         try {
//           set({ loading: true });
//           const response = await axios.get(`${API_END_POINT}/`);
//           if (response.data.success) {
//             set({ restaurant: response.data.restaurant });
//           }
//         } catch (error: any) {
//           if (error.response?.status === 404) {
//             set({ restaurant: null });
//           }
//         } finally {
//           set({ loading: false });
//         }
//       },

//       searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: string[]) => {
//         try {
//           set({ loading: true });
//           const params = new URLSearchParams();
//           params.set("searchQuery", searchQuery);
//           params.set("selectedCuisines", selectedCuisines.join(","));

//           const response = await axios.get(
//             `${API_END_POINT}/search/${searchText}?${params.toString()}`
//           );
//           if (response.data.success) {
//             set({ searchedRestaurant: response.data });
//           } else {
//             // Handle empty or unsuccessful response if needed
//             set({ searchedRestaurant: { data: [] } }); // Assuming default value is an empty array for data
//           }
//         } catch (error) {
//           console.error(error);
//         } finally {
//           set({ loading: false });
//         }
//       },

//       addMenuToRestaurant: (menu: any) => {
//         set((state: any) => {
//           if (state.restaurant) {
//             return {
//               restaurant: {
//                 ...state.restaurant,
//                 menus: [...state.restaurant.menus, menu],
//               },
//             };
//           }
//           return state;
//         });
//       },

//       updateMenuToRestaurant: (updateMenu: any) => {
//         set((state: any) => {
//           if (state.restaurant) {
//             const updateMenuList = state.restaurant.menus.map((menu: any) =>
//               menu._id === updateMenu._id ? updateMenu : menu
//             );
//             return {
//               restaurant: {
//                 ...state.restaurant,
//                 menus: updateMenuList,
//               },
//             };
//           }
//           return state;
//         });
//       },

//       setAppliedFilter: (value: string) => {
//         set((state) => {
//           const isAlreadyApplied = state.appliedFilter.includes(value);
//           const updateFilter = isAlreadyApplied
//             ? state.appliedFilter.filter((item) => item !== value)
//             : [...state.appliedFilter, value];
//           return { appliedFilter: updateFilter };
//         });
//       },

//       resetAppliedFilter: () => set({ appliedFilter: [] }),

//       getSingleRestaurant: async (restaurantId: string) => {
//         try {
//           set({ loading: true });
//           const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
//           if (response.data.success) {
//             set({ singleRestaurant: response.data.restaurant });
//           }
//         } catch (error) {
//           console.error(error);
//         } finally {
//           set({ loading: false });
//         }
//       },

//       getRestaurantOrders: async () => {
//         // Implement order fetching logic if necessary
//       },

//       updateRestaurantOrder: async (orderId: string, status: string) => {
//         // Implement order update logic if necessary
//       },
//     }),
//     {
//       name: "restaurant-name",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set, get) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.restaurant });
          }
        } catch (error: any) {
          if (error.response.status === 404) {
            set({ restaurant: null });
          }
          set({ loading: false });
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
          set({ loading: false });
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });

          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines.join(","));

          // await new Promise((resolve) => setTimeout(resolve, 2000));
          const response = await axios.get(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response.data.success) {
            set({ loading: false, searchedRestaurant: response.data });
          }
        } catch (error) {
          set({ loading: false });
        }
      },
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updateMenuToRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenuList = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenuList,
              },
            };
          }
          // if state.restaruant is undefined then return state
          return state;
        });
      },
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },
      getSingleRestaurant: async (restaurantId: string) => {
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`);
          if (response.data.success) {
            set({ singleRestaurant: response.data.restaurant });
          }
        } catch (error) {}
      },
      getRestaurantOrders: async () => {
        try {
          const response = await axios.get(`${API_END_POINT}/order`);

          if (response.data.success) {
            set(response.data.orders);
          }
        } catch (error) {}
      },
      updateRestaurantOrder: async (orderId: string, status: string) => {
        try {
          const response = await axios.put(
            `${API_END_POINT}/order/${orderId}/status`,
            { status },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            const updateOrder = get().restaurantOrder.map((order: Orders) => {
              return order._id === orderId
                ? { ...order, status: response.data.status }
                : order;
            });
            set({ restaurantOrder: updateOrder });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
