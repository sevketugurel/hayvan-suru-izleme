import React, { useState } from 'react';
import AnimalGeneralInfo from './tabs/AnimalGeneralInfo';
import AnimalHealthData from './tabs/AnimalHealthData';
import AnimalBehaviors from './tabs/AnimalBehaviors';
import AnimalReproduction from './tabs/AnimalReproduction';
import AnimalLocationSocial from './tabs/AnimalLocationSocial';
import AnimalRiskEnvironment from './tabs/AnimalRiskEnvironment';
import AnimalTreatments from './tabs/AnimalTreatments';
import AnimalCameraAnalysis from './tabs/AnimalCameraAnalysis';
import animalDetailMocks from '../../mocks/animalDetailMocks';
import './styles/AnimalDetailTabs.css';
import type {
    AnimalData,
    Vaccination,
    DiseaseHistory,
    HerdDeviationData
} from '../../types/animalDataTypes';

interface Tab {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface HerdInteraction {
    interaction: string;
    frequency: number;
    animalIds: string[];
}

interface CloseFriend {
    animalId: string;
    animalName: string;
    proximityScore?: number;
}

interface AnimalDetailTabsProps {
    animalId: string;
    animalData: any; // mock veriler için genel bir tip kullanıyoruz
}

// Pil durumu ve yüzdesini gösteren komponent
const BatteryIndicator: React.FC<{ batteryLevel: number }> = ({ batteryLevel }) => {
    const getBatteryColor = () => {
        if (batteryLevel <= 20) return "#ef4444"; // Kırmızı
        if (batteryLevel <= 50) return "#f59e0b"; // Turuncu
        return "#10b981"; // Yeşil
    };

    return (
        <div className="battery-indicator">
            <div className="battery-icon">
                <div
                    className="battery-level"
                    style={{
                        width: `${batteryLevel}%`,
                        backgroundColor: getBatteryColor()
                    }}
                ></div>
            </div>
            <span className="battery-percentage">{batteryLevel}%</span>
        </div>
    );
};

const AnimalDetailTabs: React.FC<AnimalDetailTabsProps> = ({ animalId, animalData }) => {
    const [activeTab, setActiveTab] = useState('general');

    // Hayvan sensör pil seviyesi (örnek veri)
    const batteryLevel = 78;

    // animalDetailMocks ile mevcut animalData nesnelerini birleştir
    const mockData = animalDetailMocks || {};

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
            id: 'treatments',
            label: 'Tedaviler',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 00-2.324.971l-.243.212a4 4 0 01-5.113.44l-.53-.344 1.585-1.585A3 3 0 009 8.172z" clipRule="evenodd" />
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
        },
        {
            id: 'camera',
            label: 'Kamera ve İleri Analiz',
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
        }
    ];

    return (
        <div className="animal-detail-container">
            <div className="animal-header">
                <div className="animal-header-left">
                    <div className="header-title-row">
                        <h1 className="animal-name">Sarıkız (TR123456789)</h1>
                        <BatteryIndicator batteryLevel={batteryLevel} />
                    </div>
                </div>
                <div className="animal-header-right">
                    İnek • Holstein<br />
                    Dişi • {animalData.age} yaş • {animalData.weight} kg
                </div>
            </div>

            <div className="tabs-container">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {activeTab === 'general' && (
                    <AnimalGeneralInfo
                        id={animalData.id}
                        name={animalData.name}
                        species={animalData.species}
                        breed={animalData.breed}
                        gender={animalData.gender}
                        weight={animalData.weight}
                        birthDate={animalData.birthDate}
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

                {activeTab === 'treatments' && (
                    <AnimalTreatments
                        pastTreatments={mockData.treatments?.pastTreatments || animalData.treatments.pastTreatments}
                        activeTreatments={mockData.treatments?.activeTreatments || animalData.treatments.activeTreatments}
                        vaccinations={(mockData.treatments?.vaccinations || animalData.treatments.vaccinations) as Vaccination[]}
                        diseaseHistory={(mockData.treatments?.diseaseHistory || animalData.treatments.diseaseHistory) as DiseaseHistory[]}
                        medicationUsage={mockData.treatments?.medicationUsage || animalData.treatments.medicationUsage}
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
                        gpsTracking={mockData.locationSocial?.gpsTracking || animalData.locationSocial.locationData}
                        herdDeviation={(mockData.locationSocial?.herdDeviation as HerdDeviationData) || {
                            isDeviated: false,
                            deviationHistory: animalData.locationSocial.locationData.abnormalLocationAlerts.map((alert: any) => ({
                                ...alert,
                                severity: (alert.severity || "low") as "low" | "medium" | "high"
                            })),
                            safeZones: [],
                            alertSettings: { maxDistance: 400, alertThreshold: 15 }
                        }}
                        socialBehavior={mockData.locationSocial?.socialBehavior || {
                            summary: 'Hayvan sosyal davranış verileri yükleniyor...',
                            socialScore: 75,
                            dominanceRank: 5,
                            interactions: animalData.locationSocial.socialData.herdInteractions.map((item: HerdInteraction) => ({
                                type: item.interaction,
                                frequency: item.frequency,
                                partners: item.animalIds,
                                duration: 0
                            })),
                            abnormalBehaviors: []
                        }}
                        closeFriends={mockData.locationSocial?.closeFriends || {
                            bestFriends: animalData.locationSocial.socialData.closeFriends.map((friend: CloseFriend) => ({
                                ...friend,
                                dailyInteractionTime: 120,
                                relationshipDuration: 6
                            })),
                            recentChanges: 'Sosyal ilişki verileri güncelleniyor...'
                        }}
                    />
                )}

                {activeTab === 'risk' && (
                    <AnimalRiskEnvironment
                        drowningRisk={{
                            currentRisk: (mockData.riskEnvironment?.drowningRisk?.currentRisk || 'low') as "low" | "medium" | "high",
                            riskHistory: animalData.riskEnvironment.riskData.drowningRisks.map((risk: any) => ({
                                ...risk,
                                time: '12:00',
                                duration: 0,
                                weatherConditions: 'Bilinmiyor',
                                severity: (risk.severity || 'low') as "low" | "medium" | "high"
                            })),
                            dangerZones: mockData.riskEnvironment?.drowningRisk?.dangerZones || [],
                            preventiveMeasures: mockData.riskEnvironment?.drowningRisk?.preventiveMeasures || []
                        }}
                        gasLevels={{
                            animalSpecific: {
                                lastReading: {
                                    timestamp: new Date().toISOString(),
                                    location: 'Ahır',
                                    ammonia: animalData.riskEnvironment.environmentData.gasLevels.ammonia,
                                    methane: animalData.riskEnvironment.environmentData.gasLevels.methane,
                                    carbonDioxide: 800,
                                    humidity: 65,
                                    temperature: 22
                                },
                                dailyAverage: {
                                    date: new Date().toLocaleDateString(),
                                    ammonia: animalData.riskEnvironment.environmentData.gasLevels.ammonia,
                                    methane: animalData.riskEnvironment.environmentData.gasLevels.methane,
                                    carbonDioxide: 800
                                },
                                weeklyTrend: {
                                    startDate: '2024-09-28',
                                    endDate: '2024-10-04',
                                    ammoniaTrend: 'stable' as "stable" | "increasing" | "decreasing",
                                    methaneTrend: 'stable' as "stable" | "increasing" | "decreasing",
                                    carbonDioxideTrend: 'stable' as "stable" | "increasing" | "decreasing"
                                }
                            },
                            facilityLevels: {
                                readings: mockData.riskEnvironment?.gasLevels?.facilityLevels?.readings || [],
                                safetyThresholds: {
                                    ammonia: { warning: 15, danger: 25 },
                                    methane: { warning: 500, danger: 1000 },
                                    carbonDioxide: { warning: 1500, danger: 3000 }
                                },
                                ventilationStatus: 'Normal',
                                airQualityIndex: 85
                            },
                            historicalData: animalData.riskEnvironment.environmentData.gasLevels.history.map((item: any) => ({
                                date: item.date,
                                ammonia: item.ammonia,
                                methane: item.methane,
                                carbonDioxide: 800
                            }))
                        }}
                        otherRisks={{
                            heatStress: {
                                currentLevel: 'low' as "low" | "medium" | "high",
                                temperatureHumidityIndex: 68,
                                recommendedActions: []
                            },
                            predatorRisk: {
                                level: 'low' as "low" | "medium" | "high",
                                recentSightings: [],
                                vulnerabilityScore: 15
                            }
                        }}
                    />
                )}

                {activeTab === 'camera' && (
                    <AnimalCameraAnalysis
                        feedingDuration={{
                            status: "Veri Bekleniyor",
                            estimatedDuration: "0 saat/gün",
                            reliability: 0,
                            lastUpdated: new Date().toISOString(),
                            trend: "stable" as "stable" | "increasing" | "decreasing",
                            history: [],
                            note: "Veri henüz yüklenmedi."
                        }}
                        maternalBehavior={{
                            status: "Veri Bekleniyor",
                            careScore: 0,
                            reliability: 0,
                            lastUpdated: new Date().toISOString(),
                            observations: [],
                            note: "Veri henüz yüklenmedi."
                        }}
                        birthDetection={{
                            status: "Veri Bekleniyor",
                            pregnancyStatus: "Bilinmiyor",
                            estimatedBirthDate: new Date().toISOString(),
                            remainingDays: 0,
                            warningLevel: "low" as "low" | "medium" | "high",
                            birthSigns: [],
                            previousBirthData: {
                                date: new Date().toISOString(),
                                duration: 0,
                                complications: [],
                                outcome: "Bilinmiyor"
                            },
                            preparationStatus: {
                                nestingBehavior: false,
                                restlessness: false,
                                decreasedAppetite: false,
                                isolationSeeking: false
                            },
                            note: "Veri henüz yüklenmedi."
                        }}
                        socialAnalysis={mockData.cameraAnalysis?.socialAnalysis || {
                            status: "Veri Bekleniyor",
                            reliability: 0,
                            lastUpdated: new Date().toISOString(),
                            hierarchyPosition: "Bilinmiyor",
                            groupBelonging: "Bilinmiyor",
                            socialInteractions: {
                                friendly: 0,
                                neutral: 0,
                                aggressive: 0
                            },
                            detailedAnalysis: [],
                            behaviouralPatterns: [],
                            note: "Veri henüz yüklenmedi."
                        }}
                        cameraAvailability={mockData.cameraAnalysis?.cameraAvailability || {
                            feedingArea: {
                                status: "Offline",
                                lastCheck: new Date().toISOString(),
                                resolution: "Bilinmiyor",
                                coverage: "Bilinmiyor"
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AnimalDetailTabs; 