import { useState, useEffect } from "react";
import { User, UserState } from "../types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useUserProfile = () => {
  const router = useRouter();
  const [state, setState] = useState<UserState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Simulate fetching user profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDataStr = localStorage.getItem("userData");
        
        if (!token) {
          throw new Error("No token found");
        }

        let user: User = {
            email: "",
            first_name: "User",
        };

        if (userDataStr) {
            const parsed = JSON.parse(userDataStr);
            user.email = parsed.email || "";
        }
        
        // If using reqres, we might want to fetch actual details using a mock ID since /login only gives token
        // For now, we'll maintain the "email" from login and mock the rest or fetch if an ID was stored.
        // Let's mock a more complete profile for the "wow" factor
        user = {
            ...user,
            id: 1, // mock ID
            first_name: "Eve", 
            last_name: "Holt",
            avatar: "https://reqres.in/img/faces/4-image.jpg",
            role: "Barista"
        };

        setState({ user, loading: false, error: null });
      } catch (err) {
        setState({ user: null, loading: false, error: "Failed to load profile" });
        // Optional: redirect if strictly protected here, but withAuth handles page protection
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginToken");
    localStorage.removeItem("userData");
    toast.info("Logged out successfully");
    router.push("/login");
  };

  return { ...state, logout };
};
