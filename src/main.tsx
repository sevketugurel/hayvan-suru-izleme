import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
