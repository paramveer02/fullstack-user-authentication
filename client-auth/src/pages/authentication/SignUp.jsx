import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";
import { sleep } from "../../utils/sleep";
import ClipLoader from "react-spinners/ClipLoader";

export const action = async function ({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  try {
    await customFetch.post("/auth/signup", data);
    await sleep(2000);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (err) {
    console.log(err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Signup failed. Please try again.";
    toast.error(msg);
    return null;
  }
};

const SignUp = () => {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        {/* Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
          {/* LEFT: Form panel */}
          <div className="p-8 sm:p-10">
            {/* Small logo placeholder */}
            <div className="mb-6 h-9 w-9 rounded-lg bg-indigo-600/10 grid place-items-center">
              <div className="h-4 w-4 rounded-full bg-indigo-600" />
            </div>

            <h1 className="text-2xl font-semibold text-slate-900">
              Create your account
            </h1>

            <Form method="post" className="mt-8 space-y-5">
              <FormRow name="firstName" labelText="First Name" required />
              <FormRow name="lastName" labelText="Last Name" required />
              <FormRow
                name="email"
                type="email"
                labelText="Email address"
                required
              />
              <FormRow
                name="password"
                type="password"
                labelText="Password"
                required
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="
                w-full h-11 inline-flex items-center justify-center
                rounded-lg bg-indigo-600 text-white font-medium
                shadow-sm transition-colors
                hover:bg-indigo-500 cursor-pointer
                disabled:opacity-60 disabled:cursor-not-allowed
              "
              >
                {isSubmitting ? (
                  <ClipLoader size={16} color="#ffffff" />
                ) : (
                  "Sign up"
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center"></div>
              </div>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  className="text-indigo-600 hover:text-indigo-500"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </Form>
          </div>

          {/* RIGHT: Image panel */}
          <div className="relative hidden md:block">
            <img
              src="/signup.jpg"
              alt="Workspace"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
