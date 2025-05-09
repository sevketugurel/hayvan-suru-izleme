import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/Dashboard';
import AnimalsPage from './pages/Animals';
import AnimalDetailPage from './pages/AnimalDetail';
import AlertsPage from './pages/Alerts';
import SettingsPage from './pages/Settings';
import ReportsPage from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<Navigate to="/" replace />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="animals/:animalId" element={<AnimalDetailPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
