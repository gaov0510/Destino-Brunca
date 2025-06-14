import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { News } from "@/interface/News";
import useAuth from "./useAuth";

interface NewsState {
  news: News[];
  category: number;
  page: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  setNews: (notices: News[], page?: any) => void;
}

interface UseNewsState {
  data: News[];
  category: number;
  page: {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
  getNews: () => Promise<void>;
  getNewsById: (dataId: string) => void;
  getNextPage: () => Promise<void>;
  clear: () => void;
}

const useNewsState = create<NewsState>((set) => ({
  news: [],
  category: 0,
  page: {
    current_page: 1,
    page_size: 10,
    total_items: 0,
    total_pages: 0,
  },
  setNews: (news: News[], page?: any) =>
    page ? set({ news, page }) : set({ news }),
}));

const useNews = (): UseNewsState => {
  const auth = useAuth();
  const content = useNewsState();

  async function getNews() {
    try {
      // Get data
      const response = await axios.get("/api/noticias-list?page=1");
      if (!Array.isArray(response?.data?.data) || !response.data.pagination)
        throw new Error("Error to get the news");

      console.log("Data", response.data?.data?.length);

      // Udpate state
      content.setNews(response.data.data, response.data.pagination);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("News catch", error.response?.status, error.response?.data);
        console.log(
          "Auth News catch",
          error.response?.data.message,
          error.response?.data.message?.includes("permission is required")
        );
      } else {
        console.log("Default catch", error);
      }

      if (error instanceof AxiosError) {
        if (error.response?.data.message.includes("permission is required"))
          auth.getToken();
      }
    }
  }

  async function getNewsById(id: string) {
    try {
      // Get data
      const response = await axios.get(`/api/content/${id}`);
      if (!response?.data) throw new Error("Error to get the news");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("News catch", error.response?.status, error.response?.data);
        console.log(
          "Auth News catch",
          error.response?.data.message,
          error.response?.data.message?.includes("permission is required")
        );
      } else {
        console.log("Default catch", error);
      }

      if (error instanceof AxiosError) {
        if (error.response?.data.message.includes("permission is required"))
          auth.getToken();
      }
    }
  }

  async function getNextPage() {
    try {
      // Get data
      const response = await axios(
        `/content-list?page=${content.page.current_page + 1}`
      );
      if (!Array.isArray(response.data))
        throw new Error("Error to get the news");

      // Udpate state
      content.setNews([...content.news, ...(response.data as News[])]);
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
    content.setNews([]);
  }

  return {
    data: content.news,
    category: content.category,
    page: content.page,
    getNews,
    getNextPage,
    getNewsById,
    clear,
  };
};

export default useNews;
