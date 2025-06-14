import axios, { AxiosError } from "axios";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: "",
  setToken: (token: string) => set({ token }),
}));

const useAuth = () => {
  const authStore = useAuthStore();

  async function getToken() {
    try {
      // Login
      const authReponse = await axios.post(
        "/user/login?_format=json",
        {
          name: "jwt",
          pass: "uTMQM9iYB6gCbLc",
        },
        {
          withCredentials: false,
          headers: { Authorization: undefined },
        }
      );

      const accessToken = authReponse.data.access_token;
      if (!accessToken) throw new Error("Login error");

      // Get token
      const response = await axios.get(
        "https://www.destinobrunca.com/jwt/token",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const token = response.data.token;
      if (!token) throw new Error("Error to get token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      authStore.setToken(token);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Auth catch", error);
      } else {
        console.log("Default catch", error);
      }
    }
  }

  return {
    ...authStore,
    getToken,
  };
};

export default useAuth;
