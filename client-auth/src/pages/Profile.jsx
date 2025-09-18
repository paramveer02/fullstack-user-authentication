// src/pages/Profile.jsx
import {
  Form,
  redirect,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const MAX_BYTES = 524_288; // 0.5 MB

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");

  if (file && file.size > MAX_BYTES) {
    toast.error("Image too large. Max 0.5 MB");
    return null;
  }

  try {
    await customFetch.patch("/users/update/me", formData);
    toast.success("Profile updated successfully");
    return redirect("/dashboard/profile");
  } catch (err) {
    console.log(err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Couldn't update profile. Please try again.";
    toast.error(msg);
    return null;
  }
};

export default function Profile() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // user comes from the dashboard route loader (id: "dashboard")
  const { user } = useRouteLoaderData("dashboard");

  // Avatar preview
  const [preview, setPreview] = useState(user?.avatar || "");
  const fileRef = useRef(null);

  useEffect(() => {
    // keep preview in sync if loader user changes
    setPreview(user?.avatar || "");
  }, [user?.avatar]);

  const onPickFile = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_BYTES) {
      toast.error("Image too large. Max 0.5 MB");
      // reset chosen file
      e.target.value = "";
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    // revoke later to avoid memory leak
    // We revoke it when a new selection happens or component unmounts
  };

  useEffect(() => {
    return () => {
      // best effort cleanup (only blob: URLs)
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <section className="max-w-4xl mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-b from-white/60 via-white/40 to-white/30 dark:from-gray-900/60 dark:via-gray-900/50 dark:to-gray-900/40 border border-slate-200 dark:border-gray-800">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-lg font-semibold">Profile</h1>
              <p className="text-indigo-100/90 text-sm mt-0.5">
                Manage your account information and photo
              </p>
            </div>
            <div className="text-sm text-indigo-100/80">
              Last updated:{" "}
              <span className="font-medium">
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 bg-white dark:bg-gray-900">
          <Form
            method="post"
            encType="multipart/form-data"
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {/* LEFT: Avatar */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full overflow-hidden ring-2 ring-slate-100 dark:ring-gray-700 shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                    <img
                      src={
                        preview ||
                        "https://api.dicebear.com/8.x/initials/svg?seed=" +
                          encodeURIComponent(
                            `${user?.firstName || ""} ${
                              user?.lastName || ""
                            }`.trim() ||
                              user?.email ||
                              "User"
                          )
                      }
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Camera overlay button */}
                  <button
                    type="button"
                    onClick={onPickFile}
                    title="Change photo"
                    className="absolute -bottom-2 right-0 rounded-full bg-white dark:bg-gray-800 p-2 shadow border border-slate-200 dark:border-gray-700 hover:scale-105 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-slate-700 dark:text-gray-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M8 7l2-3h4l2 3"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11a3 3 0 100 6 3 3 0 000-6z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="w-full">
                  <label htmlFor="avatar" className="sr-only">
                    Upload avatar
                  </label>

                  <div
                    onClick={onPickFile}
                    className="cursor-pointer mt-2 w-full rounded-lg border-2 border-dashed border-slate-200 dark:border-gray-700 p-3 text-center hover:bg-slate-50 dark:hover:bg-gray-800 transition"
                  >
                    <p className="text-sm text-slate-600 dark:text-gray-300">
                      Click to change or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 dark:text-gray-500 mt-1">
                      JPG/PNG/WebP • Max 0.5 MB
                    </p>
                  </div>

                  <input
                    ref={fileRef}
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Fields */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-200"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={user?.firstName || ""}
                    className="block w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-3 text-slate-900 dark:text-gray-100 placeholder-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-200"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    defaultValue={user?.lastName || ""}
                    className="block w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-3 text-slate-900 dark:text-gray-100 placeholder-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    className="block w-full rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-3 text-slate-900 dark:text-gray-100 placeholder-slate-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // reset preview to loader user avatar
                    setPreview(user?.avatar || "");
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 dark:border-gray-700 bg-transparent px-5 text-slate-700 dark:text-gray-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-gray-800 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-5 text-white text-sm font-medium shadow-sm transition-colors hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <ClipLoader size={16} color="#ffffff" />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
}
