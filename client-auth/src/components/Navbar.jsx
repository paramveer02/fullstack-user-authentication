// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDashboard } from "../context/DashboardContext";

const cx = (...c) => c.filter(Boolean).join(" ");

const Navbar = () => {
  const { user, theme, toggleTheme, logout } = useDashboard();
  const initial = (
    user?.firstName?.[0] ||
    user?.name?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <nav
      className="
      sticky top-0 z-40
      border-b border-slate-200/60 bg-white/70 backdrop-blur-md
      shadow-sm
      dark:border-gray-800/60 dark:bg-gray-900/70 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]
      transition-colors duration-300
    "
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left: Logo & Name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-20 place-items-center rounded-md bg-indigo-600 text-xs font-semibold text-white">
            Your Logo
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-gray-100">
            MyApp
          </span>
        </Link>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              [
                "text-sm font-medium transition-colors",
                "text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white",
                isActive && "text-indigo-600 dark:text-indigo-400",
              ].join(" ")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard/about"
            className={({ isActive }) =>
              [
                "text-sm font-medium transition-colors",
                "text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white",
                isActive && "text-indigo-600 dark:text-indigo-400",
              ].join(" ")
            }
          >
            About
          </NavLink>
        </div>

        {/* Right: actions (theme/profile/logout) */}
        <div className="flex items-center gap-6">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-md border border-slate-300/60 bg-white/40 p-2 text-slate-600 shadow-sm 
                   hover:bg-white/60 hover:text-slate-900
                   dark:border-gray-700/60 dark:bg-gray-800/40 dark:text-gray-300 dark:hover:text-white 
                   transition"
          >
            {theme === "dark" ? (
              <FiSun className="h-5 w-5" />
            ) : (
              <FiMoon className="h-5 w-5" />
            )}
          </button>

          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/dashboard/profile"
                className="flex flex-col items-center group"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {initial}
                </div>
                <span className="mt-0.5 text-xs text-slate-700 dark:text-gray-300 group-hover:underline">
                  Me
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="rounded-md border border-slate-300/60 px-3 py-1.5 text-sm text-slate-700 shadow-sm
                       hover:bg-slate-50 dark:border-gray-700/60 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
