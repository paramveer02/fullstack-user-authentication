import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Error from "./pages/Error";

import SignUp, { action as signupAction } from "./pages/authentication/SignUp";
import Login, { action as loginAction } from "./pages/authentication/Login";
import DashboardLayout from "./pages/DashboardLayout";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as dashboardAction } from "./pages/DashboardLayout";
import Profile from "./pages/Profile";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <SignUp />,
        action: signupAction,
      },
      { path: "login", element: <Login />, action: loginAction },
      {
        id: "dashboard",
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        action: dashboardAction,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "about", element: <About /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
