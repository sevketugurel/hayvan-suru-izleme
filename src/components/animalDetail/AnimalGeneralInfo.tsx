import React from 'react';
import './styles/AnimalGeneralInfo.css';

interface AnimalGeneralInfoProps {
    id: string;
    name: string;
    species: string;
    breed: string;
    gender: string;
    weight: number;
    birthDate: string;
}

const AnimalGeneralInfo: React.FC<AnimalGeneralInfoProps> = ({
    id,
    name,
    species,
    breed,
    gender,
    weight,
    birthDate
}) => {
    return (
        <div className="general-info-container">

            <div className="animal-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
            </div>

            <div className="info-grid">
                <div className="info-item">
                    <p className="info-label">Küpe Numarası</p>
                    <p className="info-value">{id}</p>
                </div>

                <div className="info-item">
                    <p className="info-label">İsim</p>
                    <p className="info-value">{name}</p>
                </div>

                <div className="info-item">
                    <p className="info-label">Tür</p>
                    <p className="info-value">{species}</p>
                </div>

                <div className="info-item">
                    <p className="info-label">Irk</p>
                    <p className="info-value">{breed}</p>
                </div>

                <div className="info-item">
                    <p className="info-label">Cinsiyet</p>
                    <p className="info-value">{gender} <span className="info-badge">{gender === 'Dişi' ? '♀' : '♂'}</span></p>
                </div>

                <div className="info-item">
                    <p className="info-label">Ağırlık</p>
                    <p className="info-value">{weight} kg <span className="info-badge">{weight >= 500 ? 'Sağlıklı' : 'Dikkat'}</span></p>
                </div>

                <div className="info-item">
                    <p className="info-label">Doğum Tarihi</p>
                    <p className="info-value">{birthDate}</p>
                </div>
            </div>
        </div>
    );
};

export default AnimalGeneralInfo; 