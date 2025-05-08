import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Hayvan İzleme</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/animals">Hayvanlar</Link>
        </li>
        <li>
          <Link to="/alerts">Uyarılar</Link>
        </li>
        <li>
          <Link to="/reports">Raporlar</Link>
        </li>
        <li>
          <Link to="/settings">Ayarlar</Link>
        </li>
      </ul>
      <div className="user-menu">
        <span>Admin</span>
        <button>Çıkış</button>
      </div>
    </nav>
  );
};

export default Navbar; 