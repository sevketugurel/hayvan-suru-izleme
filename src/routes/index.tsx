import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { lazy, Suspense } from "react";
import { AnimalDetailPage } from "../pages/animalDetail";

// Lazily load pages
const Dashboard = lazy(() => import("../pages/dashboard"));
const AnimalsPage = lazy(() => import("../pages/animals"));
const AlertsPage = lazy(() => import("../pages/alerts"));
const ReportsPage = lazy(() => import("../pages/reports"));
const SettingsPage = lazy(() => import("../pages/settings"));

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Wrapper component for lazy-loaded components
const LazyComponent = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Routes configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LazyComponent component={Dashboard} />,
      },
      {
        path: "animals",
        element: <LazyComponent component={AnimalsPage} />,
      },
      {
        path: "animals/:animalId",
        element: <LazyComponent component={AnimalDetailPage} />,
      },
      {
        path: "alerts",
        element: <LazyComponent component={AlertsPage} />,
      },
      // Reports routes
      {
        path: "reports",
        element: <LazyComponent component={ReportsPage} />,
      },
      {
        path: "reports/:reportType",
        element: <LazyComponent component={ReportsPage} />,
      },
      {
        path: "settings",
        element: <LazyComponent component={SettingsPage} />,
      },
    ]
  }
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes; 