import axios from "axios";

// Safe read of VITE_API_URL even if import.meta.env is undefined
const RAW_ORIGIN =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  "";

// strip one trailing slash if present
const ORIGIN = RAW_ORIGIN.replace(/\/$/, "");

const isBrowser = typeof window !== "undefined";
const baseURL = ORIGIN
  ? `${ORIGIN}/api/v1`
  : isBrowser
  ? "/api/v1" // let Vite proxy handle it in the browser
  : "http://localhost:8000/api/v1"; // fallback for Node/SSR/tests

const customFetch = axios.create({
  baseURL,
  withCredentials: true, // allow cookies storage in browser
});

export default customFetch;
