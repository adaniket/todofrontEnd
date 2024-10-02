import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

// Lazy-loaded components
const Dashboard = lazy(() => import("../view/Dashboard/Dashboard"));
const LogIn  = lazy(() => import("../view/LogIn/LogIn"));
const ListPage  = lazy(() => import("../view/ListPage/ListPage"));
const DetailsPage  = lazy(() => import("../view/DetailsPage/DetailsPage"));
const SignUp  = lazy(() => import("../view/SignUp/SignUp"));



const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    errorElement: <div>ERROR.......!</div>,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "list-page",
        element: <ListPage />,
      },
      {
        path: "list-page/details/:id",
        element: <DetailsPage />,
      },
      // Add other protected routes here
      // {
      //   path: 'productone',
      //   element: <ProductOne />,
      // },
      // {
      //   path: 'producttwo',
      //   element: <ProductTwo />,
      // },
    ],
  },

  {
    path: '/login',
    element: <LogIn />,
    errorElement: <div>ERROR.......!</div>,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    errorElement: <div>ERROR.......!</div>,
  },
]);

export default routes;
