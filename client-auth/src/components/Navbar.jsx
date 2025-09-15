import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDashboard } from "../context/DashboardContext";

const cx = (...c) => c.filter(Boolean).join(" ");

const Navbar = () => {
  const { user, theme, toggleTheme, logout } = useDashboard();
  const initial = user?.firstName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-indigo-600 text-xs font-bold text-white">
            A
          </div>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            MyApp
          </span>
        </Link>

        {/* Center: links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cx(
                "text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                isActive && "text-indigo-600 dark:text-indigo-400 font-medium"
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard/about"
            className={({ isActive }) =>
              cx(
                "text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
                isActive && "text-indigo-600 dark:text-indigo-400 font-medium"
              )
            }
          >
            About
          </NavLink>
        </div>

        {/* Right: theme + auth */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md border border-slate-200 p-2 text-slate-600 hover:text-slate-900
            dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? (
              <FiSun className="h-4 w-4" />
            ) : (
              <FiMoon className="h-4 w-4" />
            )}
          </button>

          {user ? (
            <>
              <Link
                to="/dashboard/profile"
                className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white"
                title="Profile"
              >
                {initial}
              </Link>
              <button
                onClick={logout}
                className="text-sm text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-700 hover:text-slate-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
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
