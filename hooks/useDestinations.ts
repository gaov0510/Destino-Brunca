import axios, { AxiosError } from "axios";
import { Destination } from "@/interface/Destination";
import { create } from "zustand";
import useAuth from "./useAuth";
import { query } from "express";

interface DestinationState {
  destinations: Destination[];
  category: number;
  page: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  setDestinations: (destinations: Destination[], page?: any) => void;
}

interface UseDestinationState {
  data: Destination[];
  category: number;
  page: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  getDestinations: (
    category?: string,
    canton?: string
  ) => Promise<Destination[]>;
  getNextPage: () => Promise<void>;
  clear: () => void;
}

const useDestinationState = create<DestinationState>((set) => ({
  destinations: [],
  category: 0,
  page: {
    current_page: 1,
    page_size: 10,
    total_items: 0,
    total_pages: 0,
  },
  setDestinations: (destinations: Destination[], page?: any) =>
    page ? set({ destinations, page }) : set({ destinations }),
}));

const useDestinations = (): UseDestinationState => {
  const auth = useAuth();
  const content = useDestinationState();

  async function getDestinations(
    category?: string,
    canton?: string
  ): Promise<Destination[]> {
    try {
      const querys: string[] = [];
      if (category) querys.push(`category=${category}`);
      if (canton) querys.push(`canton=${canton}`);

      console.log("Querys", querys);

      const queryString = querys.length ? `?${querys.join("&")}` : "";

      // Get data
      const response = await axios.get(`/api/content-list${queryString}`, {
        withCredentials: false,
      });
      if (!Array.isArray(response?.data?.data) || !response.data.pagination)
        throw new Error("Error to get destinations");

      // Update state
      content.setDestinations(response.data.data, response.data.pagination);

      return response.data.data as Destination[];
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Destination catch", error.response?.data);
        if (
          error.response?.data.message ===
          "The 'restful get content_list_resource' permission is required."
        )
          auth.getToken();
      } else {
        console.log("Default catch", error);
      }
      return [];
    }
  }

  async function getNextPage() {
    try {
      // Get data
      const response = await axios.get(
        `/api/content-list?page=${content.page.current_page + 1}`
      );
      if (!Array.isArray(response.data?.data))
        throw new Error("Error to get destinations");

      // Udpate state
      content.setDestinations([
        ...content.destinations,
        ...(response.data.data as Destination[]),
      ]);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (
          error.response?.data.message ===
          "The 'restful get content_list_resource' permission is required."
        )
          auth.getToken();
      }
    }
  }

  async function clear() {
    content.setDestinations([]);
  }

  return {
    data: content.destinations,
    category: content.category,
    page: content.page,
    getDestinations,
    getNextPage,
    clear,
  };
};

export default useDestinations;
