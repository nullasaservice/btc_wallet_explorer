import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import SettingsPage from "./pages/SettingsPage";
import DefaultPageLayout from "./components/DefaultPageLayout";
import AddressPage from "./pages/AddressPage";
import AddressPageLayout from "./components/AddressPageLayout";
import TransactionsPage from "./pages/TransactionsPage";

const DEFINED_ROUTES = [
  { path: "/", pageComponent: <IndexPage />, pageLayout: DefaultPageLayout },
  {
    path: "/settings",
    pageComponent: <SettingsPage />,
    pageLayout: DefaultPageLayout,
  },
  {
    path: "/addresses/:addressIndex",
    pageComponent: <AddressPage />,
    pageLayout: AddressPageLayout,
  },
  {
    path: "/addresses/:addressIndex/transactions",
    pageComponent: <TransactionsPage />,
    pageLayout: AddressPageLayout,
  },
];

const AppPages = () => {
  const pagesWithLayout = DEFINED_ROUTES.map((route) => ({
    path: route.path,
    element: <route.pageLayout>{route.pageComponent}</route.pageLayout>,
  }));

  const router = createBrowserRouter(pagesWithLayout);

  return <RouterProvider router={router} />;
};

export default AppPages;
