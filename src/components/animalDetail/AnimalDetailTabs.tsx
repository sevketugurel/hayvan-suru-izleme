import React, { useState } from 'react';
import AnimalGeneralInfo from './AnimalGeneralInfo';
import AnimalHealthData from './AnimalHealthData';
import AnimalBehaviors from './AnimalBehaviors';
import AnimalReproduction from './AnimalReproduction';
import AnimalLocationSocial from './AnimalLocationSocial';
import AnimalRiskEnvironment from './AnimalRiskEnvironment';

interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface AnimalDetailTabsProps {
    animalId: string;
    animalData: any; // mock veriler için genel bir tip kullanıyoruz
}

const AnimalDetailTabs: React.FC<AnimalDetailTabsProps> = ({ animalId, animalData }) => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs: Tab[] = [
        {
            id: 'general',
            label: 'Genel Bilgiler',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
        },
        {
            id: 'health',
            label: 'Sağlık Verileri',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
        },
        {
            id: 'behaviors',
            label: 'Davranışlar',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
        },
        {
            id: 'reproduction',
            label: 'Üreme Takibi',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
        },
        {
            id: 'location',
            label: 'Konum ve Sosyal',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
        },
        {
            id: 'risk',
            label: 'Riskler ve Çevre',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        }
    ];

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{animalData.name} ({animalData.tagNumber})</h1>
                <p className="text-gray-500">{animalData.species} • {animalData.breed}</p>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center pb-4 pt-2 px-1 border-b-2 font-medium text-sm 
                ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
              `}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="py-6">
                {activeTab === 'general' && (
                    <AnimalGeneralInfo
                        id={animalData.id}
                        tagNumber={animalData.tagNumber}
                        name={animalData.name}
                        species={animalData.species}
                        breed={animalData.breed}
                        age={animalData.age}
                        gender={animalData.gender}
                        weight={animalData.weight}
                        birthDate={animalData.birthDate}
                        acquisition={animalData.acquisition}
                    />
                )}

                {activeTab === 'health' && (
                    <AnimalHealthData
                        pulseRate={animalData.healthData.pulseRate}
                        stressLevel={animalData.healthData.stressLevel}
                        bodyTemperature={animalData.healthData.bodyTemperature}
                        medications={animalData.healthData.medications}
                    />
                )}

                {activeTab === 'behaviors' && (
                    <AnimalBehaviors
                        sleepQuality={animalData.behaviors.sleepQuality}
                        restingStandingRatio={animalData.behaviors.restingStandingRatio}
                        ruminationCount={animalData.behaviors.ruminationCount}
                        stepCount={animalData.behaviors.stepCount}
                        feedingDuration={animalData.behaviors.feedingDuration}
                    />
                )}

                {activeTab === 'reproduction' && (
                    <AnimalReproduction
                        heatCycles={animalData.reproduction.heatCycles}
                        birthData={animalData.reproduction.birthData}
                        maternalBehavior={animalData.reproduction.maternalBehavior}
                    />
                )}

                {activeTab === 'location' && (
                    <AnimalLocationSocial
                        locationData={animalData.locationSocial.locationData}
                        socialData={animalData.locationSocial.socialData}
                    />
                )}

                {activeTab === 'risk' && (
                    <AnimalRiskEnvironment
                        riskData={animalData.riskEnvironment.riskData}
                        environmentData={animalData.riskEnvironment.environmentData}
                    />
                )}
            </div>
        </div>
    );
};

export default AnimalDetailTabs; 