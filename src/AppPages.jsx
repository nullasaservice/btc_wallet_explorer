import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import SettingsPage from "./pages/SettingsPage";
import PageLayout from "./components/PageLayout";

const DEFINED_ROUTES = [
  { path: "/", element: <IndexPage /> },
  { path: "/settings", element: <SettingsPage /> },
];

const AppPages = () => {
  const pagesWithLayout = DEFINED_ROUTES.map((route) => ({
    ...route,
    element: <PageLayout>{route.element}</PageLayout>,
  }));

  const router = createBrowserRouter(pagesWithLayout);

  return <RouterProvider router={router} />;
};

export default AppPages;
