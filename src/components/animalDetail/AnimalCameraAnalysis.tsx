import React from 'react';
import './styles/AnimalCameraAnalysis.css';

interface FeedingDuration {
    status: string;
    estimatedDuration: string;
    reliability: number;
    lastUpdated: string;
    trend: 'increasing' | 'decreasing' | 'stable';
    history: {
        date: string;
        duration: number;
    }[];
    note: string;
}

interface MaternalBehavior {
    status: string;
    careScore: number;
    reliability: number;
    lastUpdated: string;
    observations: {
        date: string;
        time: string;
        behavior: string;
        duration: number;
        note: string;
    }[];
    note: string;
}

interface BirthDetection {
    status: string;
    pregnancyStatus: string;
    estimatedBirthDate: string;
    remainingDays: number;
    warningLevel: 'low' | 'medium' | 'high';
    birthSigns: {
        date: string;
        time: string;
        sign: string;
        severity: string;
    }[];
    previousBirthData: {
        date: string;
        duration: number;
        complications: string[];
        outcome: string;
    };
    preparationStatus: {
        nestingBehavior: boolean;
        restlessness: boolean;
        decreasedAppetite: boolean;
        isolationSeeking: boolean;
    };
    note: string;
}

interface SocialAnalysis {
    status: string;
    reliability: number;
    lastUpdated: string;
    hierarchyPosition: string;
    groupBelonging: string;
    socialInteractions: {
        friendly: number;
        neutral: number;
        aggressive: number;
    };
    detailedAnalysis: {
        date: string;
        interactionType: string;
        partners: string[];
        duration: number;
        note: string;
    }[];
    behaviouralPatterns: string[];
    note: string;
}

interface CameraAvailability {
    [key: string]: {
        status: string;
        lastCheck: string;
        resolution: string;
        coverage: string;
    };
}

interface AnimalCameraAnalysisProps {
    feedingDuration: FeedingDuration;
    maternalBehavior: MaternalBehavior;
    birthDetection: BirthDetection;
    socialAnalysis: SocialAnalysis;
    cameraAvailability: CameraAvailability;
}

const AnimalCameraAnalysis: React.FC<AnimalCameraAnalysisProps> = ({
    feedingDuration,
    maternalBehavior,
    birthDetection,
    socialAnalysis,
    cameraAvailability
}) => {
    const formatDateTime = (isoDateString: string) => {
        const date = new Date(isoDateString);
        return `${date.toLocaleDateString('tr-TR')} ${date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'increasing':
                return <span className="trend-icon trend-up">↑</span>;
            case 'decreasing':
                return <span className="trend-icon trend-down">↓</span>;
            default:
                return <span className="trend-icon trend-stable">→</span>;
        }
    };

    const getWarningLevelClass = (level: string) => {
        switch (level) {
            case 'high':
                return 'warning-high';
            case 'medium':
                return 'warning-medium';
            default:
                return 'warning-low';
        }
    };

    return (
        <div className="camera-analysis-container">
            <div className="section-intro">
                <h2 className="section-title">Kamera ve İleri Analiz</h2>
                <p className="section-description">
                    Bu bölüm, çiftlik kamera sistemindeki görüntü işleme ve yapay zeka analizleri aracılığıyla elde edilen verileri göstermektedir.
                    Sonuçlar gerçek zamanlı olup, kamera sisteminin bağlantı durumuna göre değişebilir.
                </p>

                <div className="camera-status-container">
                    <h3 className="subsection-title">Kamera Durumu</h3>
                    <div className="camera-status-grid">
                        {Object.entries(cameraAvailability).map(([area, status]) => (
                            <div key={area} className="camera-status-card">
                                <div className={`status-indicator ${status.status === 'Online' ? 'status-online' : 'status-offline'}`}>
                                    {status.status}
                                </div>
                                <h4 className="camera-area">{area.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h4>
                                <div className="camera-details">
                                    <p>Son kontrol: {formatDateTime(status.lastCheck)}</p>
                                    <p>Çözünürlük: {status.resolution}</p>
                                    <p>Kapsama: {status.coverage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Yem Yeme Süresi (Kamera) Bölümü */}
            <div className="analysis-section">
                <div className="analysis-header">
                    <h3 className="analysis-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        Yem Yeme Süresi (Kamera Analizi)
                    </h3>
                    <div className="analysis-status">
                        <span className="status-badge status-active">Durum: {feedingDuration.status}</span>
                        <span className="updated-text">Son Güncelleme: {formatDateTime(feedingDuration.lastUpdated)}</span>
                    </div>
                </div>

                <div className="analysis-content">
                    <div className="camera-placeholder">
                        <div className="camera-feed-placeholder">
                            <div className="feed-overlay">
                                <div className="feed-controls">
                                    <div className="feed-status">Canlı</div>
                                    <div className="feed-timestamp">{new Date().toLocaleTimeString()}</div>
                                </div>
                                <div className="feed-area-name">Yem Alanı Kamerası</div>
                            </div>
                        </div>
                    </div>

                    <div className="analysis-results">
                        <div className="result-card">
                            <h4 className="result-title">Günlük Yem Yeme Süresi</h4>
                            <div className="result-value with-trend">
                                {feedingDuration.estimatedDuration}
                                {getTrendIcon(feedingDuration.trend)}
                            </div>
                            <div className="reliability-meter">
                                <div className="reliability-label">Güvenilirlik</div>
                                <div className="reliability-bar">
                                    <div className="reliability-fill" style={{ width: `${feedingDuration.reliability}%` }}></div>
                                </div>
                                <div className="reliability-value">{feedingDuration.reliability}%</div>
                            </div>
                            <div className="result-note">{feedingDuration.note}</div>
                        </div>

                        <div className="history-table-container">
                            <h4 className="history-title">Geçmiş Kayıtlar</h4>
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Tarih</th>
                                        <th>Süre (saat)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedingDuration.history.map((record, index) => (
                                        <tr key={index}>
                                            <td>{record.date}</td>
                                            <td>{record.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Yavruya Olan İlgi (Annelik Davranışları) Bölümü */}
            <div className="analysis-section">
                <div className="analysis-header">
                    <h3 className="analysis-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Yavruya Olan İlgi (Annelik Davranışları)
                    </h3>
                    <div className="analysis-status">
                        <span className="status-badge status-good">Durum: {maternalBehavior.status}</span>
                        <span className="updated-text">Son Güncelleme: {formatDateTime(maternalBehavior.lastUpdated)}</span>
                    </div>
                </div>

                <div className="analysis-content">
                    <div className="camera-placeholder">
                        <div className="camera-feed-placeholder">
                            <div className="feed-overlay">
                                <div className="feed-controls">
                                    <div className="feed-status">Canlı</div>
                                    <div className="feed-timestamp">{new Date().toLocaleTimeString()}</div>
                                </div>
                                <div className="feed-area-name">Doğum Alanı Kamerası</div>
                            </div>
                        </div>
                    </div>

                    <div className="analysis-results">
                        <div className="result-card">
                            <h4 className="result-title">Bakım Skoru</h4>
                            <div className="care-score">
                                <div className="score-circle">
                                    <svg viewBox="0 0 36 36" className="circular-chart">
                                        <path className="circle-bg"
                                            d="M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path className="circle"
                                            strokeDasharray={`${maternalBehavior.careScore}, 100`}
                                            d="M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <text x="18" y="20.35" className="percentage">{maternalBehavior.careScore}</text>
                                    </svg>
                                </div>
                                <div className="score-details">
                                    <p>Güvenilirlik: {maternalBehavior.reliability}%</p>
                                    <p className="score-note">{maternalBehavior.note}</p>
                                </div>
                            </div>
                        </div>

                        <div className="observations-container">
                            <h4 className="observations-title">Gözlemlenen Davranışlar</h4>
                            <div className="observations-list">
                                {maternalBehavior.observations.map((obs, index) => (
                                    <div key={index} className="observation-item">
                                        <div className="observation-time">
                                            {obs.date} {obs.time}
                                        </div>
                                        <div className="observation-content">
                                            <h5 className="behavior-type">{obs.behavior}</h5>
                                            <p className="behavior-duration">Süre: {obs.duration} dakika</p>
                                            <p className="behavior-note">{obs.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doğum Anı Tespiti Bölümü */}
            <div className="analysis-section">
                <div className="analysis-header">
                    <h3 className="analysis-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Doğum Anı Tespiti
                    </h3>
                    <div className="analysis-status">
                        <span className={`status-badge ${getWarningLevelClass(birthDetection.warningLevel)}`}>
                            Durum: {birthDetection.status}
                        </span>
                    </div>
                </div>

                <div className="analysis-content">
                    <div className="camera-placeholder">
                        <div className="camera-feed-placeholder">
                            <div className="feed-overlay">
                                <div className="feed-controls">
                                    <div className="feed-status">Canlı</div>
                                    <div className="feed-timestamp">{new Date().toLocaleTimeString()}</div>
                                </div>
                                <div className="feed-area-name">Doğum Alanı Kamerası</div>
                            </div>
                        </div>
                    </div>

                    <div className="analysis-results birth-detection-results">
                        <div className="birth-info-card">
                            <div className="pregnancy-status">
                                <h4>Gebelik Durumu: <span>{birthDetection.pregnancyStatus}</span></h4>
                                <div className="birth-date-info">
                                    <p>Tahmini Doğum Tarihi: <span>{formatDate(birthDetection.estimatedBirthDate)}</span></p>
                                    <p>Kalan Gün: <span>{birthDetection.remainingDays}</span></p>
                                </div>
                            </div>

                            <div className="preparation-status">
                                <h4>Doğum Öncesi Belirtiler:</h4>
                                <ul className="preparation-list">
                                    <li className={birthDetection.preparationStatus.nestingBehavior ? 'active' : ''}>
                                        Yuva Yapma Davranışı
                                    </li>
                                    <li className={birthDetection.preparationStatus.restlessness ? 'active' : ''}>
                                        Huzursuzluk
                                    </li>
                                    <li className={birthDetection.preparationStatus.decreasedAppetite ? 'active' : ''}>
                                        İştahta Azalma
                                    </li>
                                    <li className={birthDetection.preparationStatus.isolationSeeking ? 'active' : ''}>
                                        İzolasyon Arama
                                    </li>
                                </ul>
                            </div>

                            {birthDetection.birthSigns.length > 0 && (
                                <div className="birth-signs">
                                    <h4>Doğum Belirtileri:</h4>
                                    <ul className="signs-list">
                                        {birthDetection.birthSigns.map((sign, index) => (
                                            <li key={index} className={`sign-severity-${sign.severity}`}>
                                                <span className="sign-time">{sign.date} {sign.time}</span>
                                                <span className="sign-description">{sign.sign}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="previous-birth">
                                <h4>Önceki Doğum Bilgisi:</h4>
                                <p>Tarih: {formatDate(birthDetection.previousBirthData.date)}</p>
                                <p>Süre: {birthDetection.previousBirthData.duration} saat</p>
                                <p>Sonuç: {birthDetection.previousBirthData.outcome}</p>
                                {birthDetection.previousBirthData.complications.length > 0 && (
                                    <p>Komplikasyonlar: {birthDetection.previousBirthData.complications.join(', ')}</p>
                                )}
                            </div>

                            <div className="birth-note">
                                <p>{birthDetection.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sürünün Sosyal Davranışları Bölümü */}
            <div className="analysis-section">
                <div className="analysis-header">
                    <h3 className="analysis-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Sürünün Sosyal Davranışları (Detaylı Analiz)
                    </h3>
                    <div className="analysis-status">
                        <span className="status-badge status-completed">Durum: {socialAnalysis.status}</span>
                        <span className="updated-text">Son Güncelleme: {formatDateTime(socialAnalysis.lastUpdated)}</span>
                    </div>
                </div>

                <div className="analysis-content">
                    <div className="wide-camera-placeholder">
                        <div className="camera-feed-placeholder">
                            <div className="feed-overlay">
                                <div className="feed-controls">
                                    <div className="feed-status">Canlı</div>
                                    <div className="feed-timestamp">{new Date().toLocaleTimeString()}</div>
                                </div>
                                <div className="feed-area-name">Mera Alanı Kamerası</div>
                            </div>
                        </div>
                    </div>

                    <div className="social-analysis-results">
                        <div className="social-info">
                            <div className="social-position">
                                <h4>Sosyal Konum:</h4>
                                <p>Hiyerarşi Pozisyonu: <span>{socialAnalysis.hierarchyPosition}</span></p>
                                <p>Grup Aidiyeti: <span>{socialAnalysis.groupBelonging}</span></p>
                                <p>Güvenilirlik: <span>{socialAnalysis.reliability}%</span></p>
                            </div>

                            <div className="social-interactions-chart">
                                <h4>Sosyal Etkileşim Dağılımı</h4>
                                <div className="interactions-bars">
                                    <div className="interaction-bar">
                                        <div className="interaction-label">Olumlu</div>
                                        <div className="interaction-track">
                                            <div
                                                className="interaction-fill positive"
                                                style={{ width: `${socialAnalysis.socialInteractions.friendly}%` }}
                                            ></div>
                                        </div>
                                        <div className="interaction-value">{socialAnalysis.socialInteractions.friendly}%</div>
                                    </div>
                                    <div className="interaction-bar">
                                        <div className="interaction-label">Nötr</div>
                                        <div className="interaction-track">
                                            <div
                                                className="interaction-fill neutral"
                                                style={{ width: `${socialAnalysis.socialInteractions.neutral}%` }}
                                            ></div>
                                        </div>
                                        <div className="interaction-value">{socialAnalysis.socialInteractions.neutral}%</div>
                                    </div>
                                    <div className="interaction-bar">
                                        <div className="interaction-label">Agresif</div>
                                        <div className="interaction-track">
                                            <div
                                                className="interaction-fill negative"
                                                style={{ width: `${socialAnalysis.socialInteractions.aggressive}%` }}
                                            ></div>
                                        </div>
                                        <div className="interaction-value">{socialAnalysis.socialInteractions.aggressive}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detailed-interactions">
                            <h4>Detaylı Etkileşim Analizi</h4>
                            <div className="interactions-list">
                                {socialAnalysis.detailedAnalysis.map((interaction, index) => (
                                    <div key={index} className="interaction-item">
                                        <div className="interaction-header">
                                            <span className="interaction-type">{interaction.interactionType}</span>
                                            <span className="interaction-date">{interaction.date}</span>
                                        </div>
                                        <div className="interaction-details">
                                            <p className="interaction-partners">
                                                Etkileşimde Bulunduğu Hayvanlar: {interaction.partners.join(', ')}
                                            </p>
                                            <p className="interaction-duration">Süre: {interaction.duration} dakika</p>
                                            <p className="interaction-note">{interaction.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="behavior-patterns">
                            <h4>Davranış Desenleri</h4>
                            <ul className="patterns-list">
                                {socialAnalysis.behaviouralPatterns.map((pattern, index) => (
                                    <li key={index} className="pattern-item">{pattern}</li>
                                ))}
                            </ul>
                            <div className="pattern-note">
                                <p>{socialAnalysis.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCameraAnalysis; 