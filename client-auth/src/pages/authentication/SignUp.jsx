import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";

export const action = async function ({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/signup", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (err) {
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
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <h3>Signup</h3>

      <FormRow name="firstName" labelText="First Name" required />
      <FormRow name="lastName" labelText="Last Name" required />
      <FormRow name="email" required />
      <FormRow name="password" type="password" required />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </Form>
  );
};
export default SignUp;
