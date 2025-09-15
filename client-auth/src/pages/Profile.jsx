import { useRouteLoaderData } from "react-router-dom";

export default function Profile() {
  const { user } = useRouteLoaderData("dashboard");
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Your profile
      </h2>
      <div className="mt-4 grid gap-2 text-slate-700 dark:text-slate-300">
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
      </div>
    </section>
  );
}
