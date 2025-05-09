import React from 'react';
import { Link } from 'react-router-dom';
import './NewAnimalPage.css';

const NewAnimalPage: React.FC = () => {
  return (
    <div className="new-animal-page">
      <div className="page-header">
        <h1>Yeni Hayvan Ekle</h1>
        <Link to="/animals" className="back-button">
          Hayvan Listesine Dön
        </Link>
      </div>

      <div className="form-placeholder">
        <p>Yeni hayvan ekleme formu burada yer alacak.</p>
      </div>
    </div>
  );
};

export default NewAnimalPage; 