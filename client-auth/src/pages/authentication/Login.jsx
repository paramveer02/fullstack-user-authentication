import { Form, Link, redirect, useNavigation } from "react-router-dom";
import FormRow from "../../components/FormRow";
import ClipLoader from "react-spinners/ClipLoader";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

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
    <div>
      <h3>Login</h3>
      <Form method="post">
        <FormRow name="email" type="text" />
        <FormRow name="password" type="password" />
        <p>Not Regsitered yet?</p>
        <Link to="/signup">Signup</Link>
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
          {isSubmitting ? <ClipLoader size={16} color="#ffffff" /> : "Login"}
        </button>
      </Form>
    </div>
  );
};

export default Login;
