import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { lazy } from "react";

// Lazily load pages
const Dashboard = lazy(() => import("../pages/dashboard"));
const AnimalsPage = lazy(() => import("../pages/animals"));
const AnimalDetailPage = lazy(() => import("../pages/animalDetail"));
const AlertsPage = lazy(() => import("../pages/alerts"));
const ReportsPage = lazy(() => import("../pages/reports"));
const SettingsPage = lazy(() => import("../pages/settings"));

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Routes configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<Loading />}>
            <Dashboard />
          </React.Suspense>
        ),
      },
      {
        path: "animals",
        element: (
          <React.Suspense fallback={<Loading />}>
            <AnimalsPage />
          </React.Suspense>
        ),
      },
      {
        path: "animals/:animalId",
        element: (
          <React.Suspense fallback={<Loading />}>
            <AnimalDetailPage />
          </React.Suspense>
        ),
      },
      {
        path: "alerts",
        element: (
          <React.Suspense fallback={<Loading />}>
            <AlertsPage />
          </React.Suspense>
        ),
      },
      // Reports routes
      {
        path: "reports",
        element: (
          <React.Suspense fallback={<Loading />}>
            <ReportsPage />
          </React.Suspense>
        ),
      },
      {
        path: "reports/:reportType",
        element: (
          <React.Suspense fallback={<Loading />}>
            <ReportsPage />
          </React.Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <React.Suspense fallback={<Loading />}>
            <SettingsPage />
          </React.Suspense>
        ),
      },
    ]
  }
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes; 