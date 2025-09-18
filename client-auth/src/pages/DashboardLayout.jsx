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
  } catch (error) {
    // Handle logout errors gracefully
  }
};

const DashboardLayout = () => {
  const isLoading = useNavigation().state === "loading";

  return (
    <DashboardContextProvider>
      <div className="relative min-h-screen overflow-hidden transition-colors duration-300">
        {/* Background layers */}
        <div
          aria-hidden
          className="
          pointer-events-none absolute inset-0 -z-10
          bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200
          dark:from-gray-900 dark:via-gray-950 dark:to-black
        "
        />
        <div
          aria-hidden
          className="
          pointer-events-none absolute inset-0 -z-10 opacity-60
          bg-[radial-gradient(600px_300px_at_10%_0%,rgba(99,102,241,0.12),transparent_60%),
              radial-gradient(700px_350px_at_90%_10%,rgba(16,185,129,0.10),transparent_60%),
              radial-gradient(800px_400px_at_50%_120%,rgba(14,165,233,0.10),transparent_65%)]
          dark:bg-[radial-gradient(600px_300px_at_10%_0%,rgba(99,102,241,0.15),transparent_60%),
                  radial-gradient(700px_350px_at_90%_10%,rgba(16,185,129,0.12),transparent_60%),
                  radial-gradient(800px_400px_at_50%_120%,rgba(14,165,233,0.12),transparent_65%)]
        "
        />
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
