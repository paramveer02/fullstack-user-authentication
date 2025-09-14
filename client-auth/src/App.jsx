import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Error from "./pages/Error";

import SignUp, { action as signupAction } from "./pages/authentication/SignUp";
import Login, { action as loginAction } from "./pages/authentication/Login";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { path: "signup", element: <SignUp />, action: signupAction },
      { path: "login", element: <Login />, action: loginAction },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
