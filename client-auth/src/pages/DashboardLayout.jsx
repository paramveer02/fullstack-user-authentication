import {
  Form,
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { DashboardContextProvider } from "../context/DashboardContext";
import Navbar from "../components/Navbar";

export const loader = async function ({ request }) {
  try {
    const { data } = await customFetch.get("/auth/me");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

export const action = async function ({ request }) {
  try {
    await customFetch.post("/auth/logout");
    toast.success("Logged out successfully");
    return redirect("/login");
  } catch (error) {}
};

const DashboardLayout = () => {
  const isLoading = useNavigation().state === "loading";

  return (
    <DashboardContextProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
        <Navbar />
        {isLoading && (
          <div className="h-0.5 w-full bg-indigo-600 animate-pulse" />
        )}
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </DashboardContextProvider>
  );
};
export default DashboardLayout;
