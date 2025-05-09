import React from 'react';
import './styles/AnimalRiskEnvironment.css';

interface DrownRiskData {
    currentRisk: 'low' | 'medium' | 'high';
    riskHistory: {
        date: string;
        time: string;
        location: string;
        distance: number;
        severity: 'low' | 'medium' | 'high';
        duration: number;
        weatherConditions: string;
    }[];
    dangerZones: {
        name: string;
        type: string;
        center?: { latitude: number; longitude: number };
        radius?: number;
        coordinates?: { latitude: number; longitude: number }[];
        depth: number;
        width?: number;
        flowRate?: string;
        safeDistance: number;
    }[];
    preventiveMeasures: string[];
}

interface GasLevelsData {
    animalSpecific: {
        lastReading: {
            timestamp: string;
            location: string;
            ammonia: number;
            methane: number;
            carbonDioxide: number;
            humidity: number;
            temperature: number;
        };
        dailyAverage: {
            date: string;
            ammonia: number;
            methane: number;
            carbonDioxide: number;
        };
        weeklyTrend: {
            startDate: string;
            endDate: string;
            ammoniaTrend: 'increasing' | 'decreasing' | 'stable';
            methaneTrend: 'increasing' | 'decreasing' | 'stable';
            carbonDioxideTrend: 'increasing' | 'decreasing' | 'stable';
        };
    };
    facilityLevels: {
        readings: {
            location: string;
            timestamp: string;
            ammonia: number;
            methane: number;
            carbonDioxide: number;
        }[];
        safetyThresholds: {
            ammonia: { warning: number; danger: number };
            methane: { warning: number; danger: number };
            carbonDioxide: { warning: number; danger: number };
        };
        ventilationStatus: string;
        airQualityIndex: number;
    };
    historicalData: {
        date: string;
        ammonia: number;
        methane: number;
        carbonDioxide: number;
    }[];
}

interface OtherRisksData {
    heatStress: {
        currentLevel: 'low' | 'medium' | 'high';
        temperatureHumidityIndex: number;
        recommendedActions: string[];
    };
    predatorRisk: {
        level: 'low' | 'medium' | 'high';
        recentSightings: {
            date: string;
            predatorType: string;
            location: string;
        }[];
        vulnerabilityScore: number;
    };
}

interface AnimalRiskEnvironmentProps {
    drowningRisk: DrownRiskData;
    gasLevels: GasLevelsData;
    otherRisks: OtherRisksData;
}

const AnimalRiskEnvironment: React.FC<AnimalRiskEnvironmentProps> = ({
    drowningRisk,
    gasLevels,
    otherRisks
}) => {
    // Tarihi formatlamak için yardımcı fonksiyon
    const formatDateTime = (isoDateString: string) => {
        const date = new Date(isoDateString);
        return `${date.toLocaleDateString('tr-TR')} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
    };

    // Gaz seviyesi için renk belirleme fonksiyonu
    const getGasLevelColor = (value: number, warning: number, danger: number) => {
        if (value >= danger) return 'danger-level';
        if (value >= warning) return 'warning-level';
        return 'safe-level';
    };

    // Trend için ok işareti belirleme
    const getTrendArrow = (trend: 'increasing' | 'decreasing' | 'stable') => {
        if (trend === 'increasing') return '↑';
        if (trend === 'decreasing') return '↓';
        return '→';
    };

    return (
        <div className="risk-environment-container">
            {/* Boğulma Riski */}
            <div className="risk-section">
                <div className="section-header">
                    <h3 className="section-title risk-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                        </svg>
                        Boğulma Riski
                    </h3>
                </div>

                <div className="risk-status-banner">
                    <div className={`risk-indicator risk-${drowningRisk.currentRisk}`}>
                        <span className="risk-level-text">
                            Risk Seviyesi: {drowningRisk.currentRisk === 'high' ? 'Yüksek' :
                                drowningRisk.currentRisk === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                    </div>
                </div>

                <div className="danger-zones-section">
                    <h4 className="subsection-title">Tehlikeli Bölgeler</h4>
                    <div className="danger-zones-grid">
                        {drowningRisk.dangerZones.map((zone, index) => (
                            <div key={index} className="danger-zone-card">
                                <div className="zone-header">
                                    <h5 className="zone-name">{zone.name}</h5>
                                    <span className="zone-type">{zone.type}</span>
                                </div>
                                <div className="zone-details">
                                    <p><strong>Derinlik:</strong> {zone.depth} m</p>
                                    {zone.width && <p><strong>Genişlik:</strong> {zone.width} m</p>}
                                    {zone.flowRate && <p><strong>Akış Hızı:</strong> {zone.flowRate}</p>}
                                    <p><strong>Güvenli Mesafe:</strong> {zone.safeDistance} m</p>
                                    {zone.center && (
                                        <p><strong>Merkez Koordinat:</strong> {zone.center.latitude.toFixed(6)}, {zone.center.longitude.toFixed(6)}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {drowningRisk.riskHistory.length > 0 && (
                    <div className="risk-history-section">
                        <h4 className="subsection-title">Geçmiş Riskler</h4>
                        <table className="risk-history-table">
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Konum</th>
                                    <th>Mesafe</th>
                                    <th>Süre</th>
                                    <th>Önem Derecesi</th>
                                    <th>Hava Durumu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drowningRisk.riskHistory.map((risk, index) => (
                                    <tr key={index}>
                                        <td>{risk.date} {risk.time}</td>
                                        <td>{risk.location}</td>
                                        <td>{risk.distance} m</td>
                                        <td>{risk.duration} dk</td>
                                        <td>
                                            <span className={`risk-severity severity-${risk.severity}`}>
                                                {risk.severity === 'high' ? 'Yüksek' :
                                                    risk.severity === 'medium' ? 'Orta' : 'Düşük'}
                                            </span>
                                        </td>
                                        <td>{risk.weatherConditions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {drowningRisk.preventiveMeasures.length > 0 && (
                    <div className="preventive-measures">
                        <h4 className="subsection-title">Önleyici Tedbirler</h4>
                        <ul className="measures-list">
                            {drowningRisk.preventiveMeasures.map((measure, index) => (
                                <li key={index} className="measure-item">{measure}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Ortamdaki Gaz Seviyeleri */}
            <div className="environment-section">
                <div className="section-header">
                    <h3 className="section-title environment-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                        </svg>
                        Ortamdaki Gaz Seviyeleri
                    </h3>
                </div>

                <div className="gas-levels-current">
                    <h4 className="subsection-title">Hayvanın Bulunduğu Ortam ({gasLevels.animalSpecific.lastReading.location})</h4>
                    <div className="current-readings">
                        <div className="reading-card">
                            <div className="reading-header">
                                <h5 className="reading-title">Amonyak (NH₃)</h5>
                                <span className={`reading-value ${getGasLevelColor(
                                    gasLevels.animalSpecific.lastReading.ammonia,
                                    gasLevels.facilityLevels.safetyThresholds.ammonia.warning,
                                    gasLevels.facilityLevels.safetyThresholds.ammonia.danger
                                )}`}>
                                    {gasLevels.animalSpecific.lastReading.ammonia} ppm
                                </span>
                            </div>
                            <div className="reading-thresholds">
                                <span>Uyarı: {gasLevels.facilityLevels.safetyThresholds.ammonia.warning} ppm</span>
                                <span>Tehlike: {gasLevels.facilityLevels.safetyThresholds.ammonia.danger} ppm</span>
                            </div>
                            <div className="reading-trend">
                                <span>Haftalık Trend: {getTrendArrow(gasLevels.animalSpecific.weeklyTrend.ammoniaTrend)}</span>
                            </div>
                        </div>

                        <div className="reading-card">
                            <div className="reading-header">
                                <h5 className="reading-title">Metan (CH₄)</h5>
                                <span className={`reading-value ${getGasLevelColor(
                                    gasLevels.animalSpecific.lastReading.methane,
                                    gasLevels.facilityLevels.safetyThresholds.methane.warning,
                                    gasLevels.facilityLevels.safetyThresholds.methane.danger
                                )}`}>
                                    {gasLevels.animalSpecific.lastReading.methane} ppm
                                </span>
                            </div>
                            <div className="reading-thresholds">
                                <span>Uyarı: {gasLevels.facilityLevels.safetyThresholds.methane.warning} ppm</span>
                                <span>Tehlike: {gasLevels.facilityLevels.safetyThresholds.methane.danger} ppm</span>
                            </div>
                            <div className="reading-trend">
                                <span>Haftalık Trend: {getTrendArrow(gasLevels.animalSpecific.weeklyTrend.methaneTrend)}</span>
                            </div>
                        </div>

                        <div className="reading-card">
                            <div className="reading-header">
                                <h5 className="reading-title">Karbondioksit (CO₂)</h5>
                                <span className={`reading-value ${getGasLevelColor(
                                    gasLevels.animalSpecific.lastReading.carbonDioxide,
                                    gasLevels.facilityLevels.safetyThresholds.carbonDioxide.warning,
                                    gasLevels.facilityLevels.safetyThresholds.carbonDioxide.danger
                                )}`}>
                                    {gasLevels.animalSpecific.lastReading.carbonDioxide} ppm
                                </span>
                            </div>
                            <div className="reading-thresholds">
                                <span>Uyarı: {gasLevels.facilityLevels.safetyThresholds.carbonDioxide.warning} ppm</span>
                                <span>Tehlike: {gasLevels.facilityLevels.safetyThresholds.carbonDioxide.danger} ppm</span>
                            </div>
                            <div className="reading-trend">
                                <span>Haftalık Trend: {getTrendArrow(gasLevels.animalSpecific.weeklyTrend.carbonDioxideTrend)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="supplementary-readings">
                        <div className="reading-small">
                            <span className="reading-label">Nem:</span>
                            <span className="reading-small-value">{gasLevels.animalSpecific.lastReading.humidity}%</span>
                        </div>
                        <div className="reading-small">
                            <span className="reading-label">Sıcaklık:</span>
                            <span className="reading-small-value">{gasLevels.animalSpecific.lastReading.temperature}°C</span>
                        </div>
                        <div className="reading-small">
                            <span className="reading-label">Son Güncelleme:</span>
                            <span className="reading-small-value">{formatDateTime(gasLevels.animalSpecific.lastReading.timestamp)}</span>
                        </div>
                        <div className="reading-small">
                            <span className="reading-label">Havalandırma:</span>
                            <span className="reading-small-value">{gasLevels.facilityLevels.ventilationStatus}</span>
                        </div>
                        <div className="reading-small">
                            <span className="reading-label">Hava Kalitesi:</span>
                            <span className={`reading-small-value ${gasLevels.facilityLevels.airQualityIndex > 75 ? 'good-quality' :
                                    gasLevels.facilityLevels.airQualityIndex > 50 ? 'medium-quality' : 'poor-quality'
                                }`}>
                                {gasLevels.facilityLevels.airQualityIndex}/100
                            </span>
                        </div>
                    </div>
                </div>

                <div className="historical-gas-data">
                    <h4 className="subsection-title">Son 5 Gün Verileri</h4>
                    <table className="historical-data-table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Amonyak</th>
                                <th>Metan</th>
                                <th>Karbondioksit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gasLevels.historicalData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.date}</td>
                                    <td className={getGasLevelColor(
                                        data.ammonia,
                                        gasLevels.facilityLevels.safetyThresholds.ammonia.warning,
                                        gasLevels.facilityLevels.safetyThresholds.ammonia.danger
                                    )}>
                                        {data.ammonia} ppm
                                    </td>
                                    <td className={getGasLevelColor(
                                        data.methane,
                                        gasLevels.facilityLevels.safetyThresholds.methane.warning,
                                        gasLevels.facilityLevels.safetyThresholds.methane.danger
                                    )}>
                                        {data.methane} ppm
                                    </td>
                                    <td className={getGasLevelColor(
                                        data.carbonDioxide,
                                        gasLevels.facilityLevels.safetyThresholds.carbonDioxide.warning,
                                        gasLevels.facilityLevels.safetyThresholds.carbonDioxide.danger
                                    )}>
                                        {data.carbonDioxide} ppm
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Diğer Riskler */}
            <div className="risk-section">
                <div className="section-header">
                    <h3 className="section-title risk-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Diğer Riskler
                    </h3>
                </div>

                <div className="other-risks-grid">
                    <div className="other-risk-card">
                        <h4 className="risk-card-title">Isı Stresi</h4>
                        <div className={`risk-status-badge risk-${otherRisks.heatStress.currentLevel}`}>
                            {otherRisks.heatStress.currentLevel === 'high' ? 'Yüksek Risk' :
                                otherRisks.heatStress.currentLevel === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
                        </div>
                        <p className="risk-details">
                            <strong>Sıcaklık-Nem İndeksi (THI):</strong> {otherRisks.heatStress.temperatureHumidityIndex}
                        </p>
                        {otherRisks.heatStress.recommendedActions.length > 0 && (
                            <div className="risk-actions">
                                <h5 className="actions-title">Önerilen Eylemler:</h5>
                                <ul className="actions-list">
                                    {otherRisks.heatStress.recommendedActions.map((action, index) => (
                                        <li key={index}>{action}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="other-risk-card">
                        <h4 className="risk-card-title">Yırtıcı Hayvan Riski</h4>
                        <div className={`risk-status-badge risk-${otherRisks.predatorRisk.level}`}>
                            {otherRisks.predatorRisk.level === 'high' ? 'Yüksek Risk' :
                                otherRisks.predatorRisk.level === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
                        </div>
                        <p className="risk-details">
                            <strong>Savunmasızlık Skoru:</strong> {otherRisks.predatorRisk.vulnerabilityScore}/100
                        </p>

                        {otherRisks.predatorRisk.recentSightings.length > 0 ? (
                            <div className="predator-sightings">
                                <h5 className="sightings-title">Son Görüşler:</h5>
                                <ul className="sightings-list">
                                    {otherRisks.predatorRisk.recentSightings.map((sighting, index) => (
                                        <li key={index}>
                                            <strong>{sighting.date}:</strong> {sighting.predatorType} ({sighting.location})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="no-sightings">Son dönemde yırtıcı hayvan görüşü bildirilmedi.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalRiskEnvironment; 