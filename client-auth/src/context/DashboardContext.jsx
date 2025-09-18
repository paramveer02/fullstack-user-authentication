import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { replace, useNavigate, useRouteLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  // get user from the dashboard route loader(id:dashboard)
  const data = useRouteLoaderData("dashboard");
  const user = data?.user ?? data;

  // theme
  const getInitialTheme = () => localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // logout
  const navigate = useNavigate();
  const logout = async function () {
    try {
      await customFetch.post("/auth/logout");
      toast.success("Logged out");
      navigate("/login", { replace: true });
    } catch (error) {
      // Log error for debugging but don't expose to user
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again.");
    }
  };
  const value = useMemo(() => ({ user, theme, toggleTheme, logout }), [user, theme, logout]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDashboard must be used within DashboardProvider");

  return ctx;
}
