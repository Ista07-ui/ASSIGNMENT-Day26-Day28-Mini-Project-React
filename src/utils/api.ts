import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post(
    "/register",
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_78a869f591654962800d3a55978d5b34",
      },
    }
  );
  return response.data;
};

export const getUsers = async (page: number = 1) => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const getUserKey = (id: number) => `/users/${id}`;

export const getUser = async (id: number) => {
  const response = await api.get(`/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres_78a869f591654962800d3a55978d5b34",
    },
  });
  return response.data;
};

export default api;
