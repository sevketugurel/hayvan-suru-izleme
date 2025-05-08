import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import AnimalsPage from "../pages/animals/AnimalsPage";
import AnimalDetailPage from "../pages/animalDetail/AnimalDetailPage";
import AlertsPage from "../pages/alerts/AlertsPage";
import ReportsPage from "../pages/reports/ReportsPage";
import SettingsPage from "../pages/settings/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "animals",
        element: <AnimalsPage />
      },
      {
        path: "animals/:id",
        element: <AnimalDetailPage />
      },
      {
        path: "alerts",
        element: <AlertsPage />
      },
      {
        path: "reports",
        element: <ReportsPage />
      },
      {
        path: "settings",
        element: <SettingsPage />
      }
    ]
  }
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes; 