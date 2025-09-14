import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Error from "./pages/Error";
import SignUp from "./pages/authentication/SignUp";

import { action as signupAction } from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { path: "signup", element: <SignUp />, action: signupAction },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
