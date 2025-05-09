import React from 'react';
import './styles/AnimalLocationSocial.css';

interface LocationData {
    currentPosition: {
        latitude: number;
        longitude: number;
        timestamp: string;
        accuracy: number;
    };
    dailyMovement: {
        timestamp: string;
        latitude: number;
        longitude: number;
    }[];
    pastLocations: {
        date: string;
        positions: {
            timestamp: string;
            latitude: number;
            longitude: number;
        }[];
    }[];
}

interface HerdDeviationData {
    isDeviated: boolean;
    deviationHistory: {
        date: string;
        time: string;
        description: string;
        severity: 'low' | 'medium' | 'high';
        duration: number;
        distance: number;
        action: string;
    }[];
    safeZones: {
        name: string;
        center: {
            latitude: number;
            longitude: number;
        };
        radius: number;
    }[];
    alertSettings: {
        maxDistance: number;
        alertThreshold: number;
    };
}

interface SocialBehaviorData {
    summary: string;
    socialScore: number;
    dominanceRank: number;
    interactions: {
        type: string;
        frequency: number;
        partners: string[];
        duration: number;
    }[];
    abnormalBehaviors: string[];
}

interface CloseFriendsData {
    bestFriends: {
        animalId: string;
        animalName: string;
        proximityScore: number;
        dailyInteractionTime: number;
        relationshipDuration: number;
    }[];
    recentChanges: string;
    socialNetworkVisualization?: string;
}

interface AnimalLocationSocialProps {
    gpsTracking: LocationData;
    herdDeviation: HerdDeviationData;
    socialBehavior: SocialBehaviorData;
    closeFriends: CloseFriendsData;
}

const AnimalLocationSocial: React.FC<AnimalLocationSocialProps> = ({
    gpsTracking,
    herdDeviation,
    socialBehavior,
    closeFriends
}) => {
    // Tarihi formatlamak için yardımcı fonksiyon
    const formatDateTime = (isoDateString: string) => {
        const date = new Date(isoDateString);
        return `${date.toLocaleDateString('tr-TR')} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div className="location-social-container">
            {/* GPS ile Konum Takibi */}
            <div className="location-section">
                <div className="section-header">
                    <h3 className="section-title location-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        GPS ile Konum Takibi
                    </h3>
                </div>
                <div className="map-container">
                    <div className="map-placeholder">
                        Harita yükleniyor...
                    </div>
                    <div className="coords-display">
                        <div className="current-location-info">
                            <p><strong>Mevcut Konum:</strong> {gpsTracking.currentPosition.latitude.toFixed(6)}, {gpsTracking.currentPosition.longitude.toFixed(6)}</p>
                            <p><strong>Son Güncelleme:</strong> {formatDateTime(gpsTracking.currentPosition.timestamp)}</p>
                            <p><strong>Doğruluk:</strong> {gpsTracking.currentPosition.accuracy} metre</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="path-history-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100-2h-1a1 1 0 100 2h1z" clipRule="evenodd" />
                        </svg>
                        Bugünkü Hareket
                    </h4>
                    <div className="path-history-container">
                        {gpsTracking.dailyMovement.map((point, index) => (
                            <div key={index} className="path-history-item">
                                <span className="path-time">{formatDateTime(point.timestamp)}</span>
                                <span className="path-coords">{point.latitude.toFixed(6)}, {point.longitude.toFixed(6)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sürüden Uzaklaşma / Anormal Lokasyon Davranışı */}
            <div className="location-section">
                <div className="section-header">
                    <h3 className="section-title location-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Sürüden Uzaklaşma / Anormal Lokasyon Davranışı
                    </h3>
                    <button className="refresh-button">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Yenile
                    </button>
                </div>

                <div className="deviation-status">
                    <p className={`status-indicator ${herdDeviation.isDeviated ? 'status-warning' : 'status-normal'}`}>
                        <span className="status-icon">
                            {herdDeviation.isDeviated ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            }
                        </span>
                        {herdDeviation.isDeviated ?
                            'Hayvan şu anda sürüden uzakta!' :
                            'Hayvan şu anda sürü ile birlikte'
                        }
                    </p>
                    <div className="safe-zones-info">
                        <p><strong>Güvenli Bölgeler:</strong></p>
                        <ul className="safe-zones-list">
                            {herdDeviation.safeZones.map((zone, index) => (
                                <li key={index}>
                                    {zone.name} (Merkez: {zone.center.latitude.toFixed(6)}, {zone.center.longitude.toFixed(6)}, Yarıçap: {zone.radius}m)
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {herdDeviation.deviationHistory.length > 0 ? (
                    <table className="alerts-table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Açıklama</th>
                                <th>Mesafe</th>
                                <th>Süre</th>
                                <th>Önem Derecesi</th>
                                <th>Yapılan İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {herdDeviation.deviationHistory.map((alert, index) => (
                                <tr key={index}>
                                    <td>{alert.date} {alert.time}</td>
                                    <td>{alert.description}</td>
                                    <td>{alert.distance} m</td>
                                    <td>{alert.duration} dk</td>
                                    <td>
                                        <span className={`alert-severity severity-${alert.severity}`}>
                                            {alert.severity === 'high' ? 'Yüksek' :
                                                alert.severity === 'medium' ? 'Orta' : 'Düşük'}
                                        </span>
                                    </td>
                                    <td>{alert.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="empty-message">Anormal lokasyon uyarısı bulunmamaktadır.</p>
                )}
            </div>

            {/* Sürünün Sosyal Davranışları */}
            <div className="social-section">
                <div className="section-header">
                    <h3 className="section-title social-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        Sürünün Sosyal Davranışları
                    </h3>
                </div>

                <div className="social-behavior-summary">
                    <p className="summary-text">{socialBehavior.summary}</p>

                    <div className="social-metrics">
                        <div className="social-metric-card">
                            <p className="metric-label">Sosyal Skor</p>
                            <div className="metric-value-container">
                                <div className="metric-progress">
                                    <div
                                        className={`metric-progress-fill ${socialBehavior.socialScore > 75 ? 'high-score' :
                                                socialBehavior.socialScore > 50 ? 'medium-score' : 'low-score'
                                            }`}
                                        style={{ width: `${socialBehavior.socialScore}%` }}>
                                    </div>
                                </div>
                                <p className="metric-value">{socialBehavior.socialScore}/100</p>
                            </div>
                        </div>

                        <div className="social-metric-card">
                            <p className="metric-label">Sürü Hiyerarşisindeki Sırası</p>
                            <p className="metric-value rank-value">{socialBehavior.dominanceRank}.</p>
                        </div>
                    </div>
                </div>

                {socialBehavior.interactions.length > 0 ? (
                    <table className="interactions-table">
                        <thead>
                            <tr>
                                <th>Etkileşim</th>
                                <th>Sıklık</th>
                                <th>Süre</th>
                                <th>Etkileşimde Bulunulan Hayvanlar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {socialBehavior.interactions.map((interaction, index) => (
                                <tr key={index}>
                                    <td>{interaction.type}</td>
                                    <td>{interaction.frequency} kez/gün</td>
                                    <td>{interaction.duration} dk/gün</td>
                                    <td>
                                        {interaction.partners.join(', ')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="empty-message">Kayıtlı sosyal etkileşim bulunmamaktadır.</p>
                )}

                {socialBehavior.abnormalBehaviors.length > 0 && (
                    <div className="abnormal-behaviors">
                        <h4 className="abnormal-behaviors-title">Anormal Davranışlar</h4>
                        <ul className="abnormal-behaviors-list">
                            {socialBehavior.abnormalBehaviors.map((behavior, index) => (
                                <li key={index} className="abnormal-behavior-item">{behavior}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* İneğin Kankalarını Tespit Etme */}
            <div className="social-section">
                <div className="section-header">
                    <h3 className="section-title social-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        Yakın Arkadaşlar
                    </h3>
                </div>

                {closeFriends.bestFriends.length > 0 ? (
                    <div className="friends-section">
                        <p className="friends-summary">{closeFriends.recentChanges}</p>
                        <div className="friends-grid">
                            {closeFriends.bestFriends.map((friend, index) => (
                                <div key={index} className="friend-card">
                                    <div className="friend-info">
                                        <p className="friend-name">{friend.animalName}</p>
                                        <p className="friend-id">ID: {friend.animalId}</p>
                                        <p className="relationship-duration">{friend.relationshipDuration} aydır yakın</p>
                                        <p className="daily-interaction">Günlük etkileşim: {friend.dailyInteractionTime} dakika</p>
                                    </div>
                                    <div className="proximity-container">
                                        <div className="proximity-bar">
                                            <div
                                                className="proximity-fill"
                                                style={{ width: `${friend.proximityScore}%` }}
                                            ></div>
                                        </div>
                                        <p className="proximity-text">Yakınlık: {friend.proximityScore}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="empty-message">Yakın arkadaş tespit edilmemiştir.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalLocationSocial; 