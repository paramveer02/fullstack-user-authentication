import { Form, Link, redirect, useNavigation } from "react-router-dom";
import FormRow from "../../components/FormRow";
import ClipLoader from "react-spinners/ClipLoader";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useDashboard } from "../../context/DashboardContext";

export const action = async function ({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login Successful");
    return redirect("/dashboard");
  } catch (err) {
    console.log(err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Login failed. Please try again.";
    toast.error(msg);
    return null;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
          {/* LEFT: Form panel */}
          <div className="p-8 sm:p-10">
            {/* Tiny brand mark (optional) */}
            <div className="mb-6 h-9 w-9 rounded-lg bg-indigo-600/10 grid place-items-center">
              <div className="h-4 w-4 rounded-full bg-indigo-600" />
            </div>

            <h1 className="text-2xl font-semibold text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Enter your credentials to access your account.
            </p>

            <Form method="post" className="mt-8 space-y-6">
              <div className="space-y-5">
                <FormRow
                  name="email"
                  type="email"
                  labelText="Email address"
                  defaultValue="param@test.com"
                  required
                />
                <FormRow
                  name="password"
                  type="password"
                  labelText="Password"
                  defaultValue="Admin123!"
                  required
                />
              </div>

              {/* Utility row */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="
                w-full h-11 inline-flex items-center justify-center
                rounded-lg bg-indigo-600 text-white font-medium
                shadow-sm transition-colors
                hover:bg-indigo-500
              "
              >
                {isSubmitting ? (
                  <ClipLoader size={16} color="#ffffff" />
                ) : (
                  "Log in"
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center"></div>
              </div>

              {/* Footer link */}
              <p className="text-center text-sm text-slate-600">
                Not registered yet?{" "}
                <Link to="/" className="text-indigo-600 hover:text-indigo-500">
                  Create an account
                </Link>
              </p>
            </Form>
          </div>

          {/* RIGHT: Image panel (nice, subtle) */}
          <div className="relative hidden md:block">
            <img
              src="/login.jpg"
              alt="Workspace"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/70 backdrop-blur px-4 py-3 text-sm text-slate-700 shadow">
              Secure access powered by modern web tech.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
