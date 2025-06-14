import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface SearchState {
  data: any[];
  page: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  setData: (data: any[], page?: any) => void;
}

interface UseSearchState {
  data: any[];
  page: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  getData: (search: string) => Promise<void>;
  getNextPage: () => Promise<void>;
  clear: () => void;
}

const useSearchState = create<SearchState>((set) => ({
  data: [],
  page: {
    current_page: 1,
    page_size: 10,
    total_items: 0,
    total_pages: 0,
  },
  setData: (data: any[], page?: any) =>
    page ? set({ data, page }) : set({ data }),
}));

const useSearch = (): UseSearchState => {
  const content = useSearchState();

  async function getData(search: string) {
    try {
      console.log(1);

      // Get data
      const response = await axios.get(
        `/api/content-search?search=${search}&page=1`,
        {
          withCredentials: false,
        }
      );
      if (!Array.isArray(response?.data?.data) || !response.data.pagination)
        throw new Error("Error to get the search");

      console.log(2);

      console.log(response?.data);

      // Udpate state
      content.setData(response.data.data, response.data.pagination);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Destination catch", error.response?.data);
      } else {
        console.log("Default catch", error);
      }
    }
  }

  async function getNextPage() {
    try {
      // Get data
      const response = await axios.get(
        `/api/content-search?search=hotel&page=${content.page.current_page + 1}`
      );
      if (!Array.isArray(response.data?.data))
        throw new Error("Error to get destinations");

      // Udpate state
      content.setData([...content.data, ...(response.data.data as any[])]);
    } catch (error) {
      console.log(error);
    }
  }

  async function clear() {
    content.setData([]);
  }

  return {
    data: content.data,
    page: content.page,
    getData,
    getNextPage,
    clear,
  };
};

export default useSearch;
