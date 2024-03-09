import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import SettingsPage from "./pages/SettingsPage";

const AppPages = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<IndexPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppPages;
