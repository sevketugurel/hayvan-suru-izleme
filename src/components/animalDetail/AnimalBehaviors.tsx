import React from 'react';
import './styles/AnimalBehaviors.css';

interface BehaviorMetric {
    date: string;
    value: number;
}

interface AnimalBehaviorsProps {
    sleepQuality: {
        duration: number; // saat
        periods: number;
        qualityScore: number; // 1-10 arası
        history: BehaviorMetric[];
    };
    restingStandingRatio: {
        resting: number; // saat
        standing: number; // saat
        history: BehaviorMetric[];
    };
    ruminationCount: {
        daily: number;
        hourly: BehaviorMetric[];
    };
    stepCount: {
        daily: number;
        history: BehaviorMetric[];
    };
    feedingDuration: {
        daily: number; // dakika
        frequency: number;
        cameraFootageUrl?: string;
    };
}

const AnimalBehaviors: React.FC<AnimalBehaviorsProps> = ({
    sleepQuality,
    restingStandingRatio,
    ruminationCount,
    stepCount,
    feedingDuration
}) => {
    return (
        <div className="behaviors-container">
            {/* Uyku ve Dinlenme Kalitesi */}
            <div className="behavior-section">
                <div className="behavior-header">
                    <h3 className="behavior-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                        Uyku ve Dinlenme Kalitesi
                    </h3>
                </div>
                <div className="behavior-metrics">
                    <div className="metric-card">
                        <p className="metric-label">Toplam Süre</p>
                        <p className="metric-value">{sleepQuality.duration} saat</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Periyot Sayısı</p>
                        <p className="metric-value">{sleepQuality.periods}</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Kalite Puanı</p>
                        <p className="metric-value sleep-metric-good">{sleepQuality.qualityScore}/10</p>
                    </div>
                </div>
                <div className="behavior-chart">
                    <div className="chart-placeholder">Uyku kalitesi grafiği burada görüntülenecek</div>
                </div>
            </div>

            {/* Dinlenme / Ayakta Kalma Süresi */}
            <div className="behavior-section">
                <div className="behavior-header">
                    <h3 className="behavior-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Dinlenme / Ayakta Kalma Süresi
                    </h3>
                </div>
                <div className="behavior-metrics">
                    <div className="metric-card">
                        <p className="metric-label">Dinlenme</p>
                        <p className="metric-value">{restingStandingRatio.resting} saat</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Ayakta Kalma</p>
                        <p className="metric-value">{restingStandingRatio.standing} saat</p>
                    </div>
                </div>
                <div className="behavior-chart">
                    <div className="chart-placeholder">Dinlenme/Ayakta kalma oranı grafiği burada görüntülenecek</div>
                </div>
            </div>

            {/* Geviş Getirme Sayısı */}
            <div className="behavior-section">
                <div className="behavior-header">
                    <h3 className="behavior-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Geviş Getirme Sayısı
                    </h3>
                </div>
                <div className="single-metric">
                    <div className="metric-card">
                        <p className="metric-label">Günlük Toplam</p>
                        <p className="metric-value">{ruminationCount.daily}</p>
                    </div>
                </div>
                <div className="behavior-chart">
                    <div className="chart-placeholder">Saatlik geviş getirme grafiği burada görüntülenecek</div>
                </div>
            </div>

            {/* Adım Sayısı ve Hareketlilik */}
            <div className="behavior-section">
                <div className="behavior-header">
                    <h3 className="behavior-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
                        </svg>
                        Adım Sayısı ve Hareketlilik
                    </h3>
                </div>
                <div className="single-metric">
                    <div className="metric-card">
                        <p className="metric-label">Günlük Adım</p>
                        <p className="metric-value">{stepCount.daily}</p>
                    </div>
                </div>
                <div className="behavior-chart">
                    <div className="chart-placeholder">Günlük aktivite grafiği burada görüntülenecek</div>
                </div>
            </div>

            {/* Yem Yeme Süresi */}
            <div className="behavior-section">
                <div className="behavior-header">
                    <h3 className="behavior-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                        </svg>
                        Yem Yeme Süresi
                    </h3>
                </div>
                <div className="behavior-metrics">
                    <div className="metric-card">
                        <p className="metric-label">Günlük Süre</p>
                        <p className="metric-value">{feedingDuration.daily} dakika</p>
                    </div>
                    <div className="metric-card">
                        <p className="metric-label">Sıklık</p>
                        <p className="metric-value">{feedingDuration.frequency} kez/gün</p>
                    </div>
                </div>
                {feedingDuration.cameraFootageUrl && (
                    <div className="camera-section">
                        <p className="camera-label">Kamera Görüntüsü</p>
                        <div className="camera-footage">
                            <span className="camera-message">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                                Kamera görüntüsüne erişmek için tıklayın
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalBehaviors; 