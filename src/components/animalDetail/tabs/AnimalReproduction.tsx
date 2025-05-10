import React from 'react';
import '../styles/AnimalReproduction.css';

interface HeatCycle {
    date: string;
    symptoms: string[];
    certainty: number; // 0-100 arası yüzdelik değer
}

interface BirthData {
    expectedDate?: string;
    symptoms?: string[];
    laborStartTime?: string;
    laborEndTime?: string;
    status: 'waiting' | 'in_progress' | 'completed' | 'none';
}

interface MaternalBehavior {
    interactionDuration: number; // dakika
    behaviourNotes: string[];
    cameraFootageUrl?: string;
}

interface AnimalReproductionProps {
    heatCycles: HeatCycle[];
    birthData: BirthData;
    maternalBehavior?: MaternalBehavior;
}

const AnimalReproduction: React.FC<AnimalReproductionProps> = ({
    heatCycles,
    birthData,
    maternalBehavior
}) => {
    return (
        <div className="reproduction-container">
            {/* Kızgınlık Dönemi Takibi */}
            <div className="reproduction-section">
                <div className="reproduction-header">
                    <h3 className="reproduction-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        Kızgınlık Dönemi Takibi
                    </h3>
                </div>

                {heatCycles.length > 0 ? (
                    <table className="heat-cycles-table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Belirtiler</th>
                                <th>Kesinlik</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heatCycles.map((cycle, index) => (
                                <tr key={index}>
                                    <td>{cycle.date}</td>
                                    <td>
                                        <ul className="symptoms-list">
                                            {cycle.symptoms.map((symptom, idx) => (
                                                <li key={idx}>{symptom}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <div className="certainty-container">
                                            <div className="certainty-bar">
                                                <div
                                                    className={`certainty-fill ${cycle.certainty > 75 ? 'high-certainty' :
                                                            cycle.certainty > 50 ? 'medium-certainty' :
                                                                'low-certainty'
                                                        }`}
                                                    style={{ width: `${cycle.certainty}%` }}
                                                ></div>
                                            </div>
                                            <span className="certainty-text">%{cycle.certainty}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="empty-message">Kayıtlı kızgınlık döngüsü bulunmamaktadır.</p>
                )}
            </div>

            {/* Doğum Anı Tespiti */}
            <div className="reproduction-section">
                <div className="reproduction-header">
                    <h3 className="reproduction-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                        Doğum Anı Tespiti
                    </h3>
                </div>

                {birthData.status !== 'none' ? (
                    <div>
                        <div className="birth-info-grid">
                            {birthData.expectedDate && (
                                <div className="birth-info-card">
                                    <p className="birth-info-label">Beklenen Doğum Tarihi</p>
                                    <p className="birth-info-value">{birthData.expectedDate}</p>
                                </div>
                            )}

                            <div className="birth-info-card">
                                <p className="birth-info-label">Durum</p>
                                <span className={`birth-status ${birthData.status === 'waiting' ? 'status-waiting' :
                                        birthData.status === 'in_progress' ? 'status-in-progress' :
                                            'status-completed'
                                    }`}>
                                    {birthData.status === 'waiting' && 'Bekleniyor'}
                                    {birthData.status === 'in_progress' && 'Doğum Başladı'}
                                    {birthData.status === 'completed' && 'Tamamlandı'}
                                </span>
                            </div>

                            {birthData.laborStartTime && (
                                <div className="birth-info-card">
                                    <p className="birth-info-label">Doğum Başlangıç Zamanı</p>
                                    <p className="birth-info-value">{birthData.laborStartTime}</p>
                                </div>
                            )}

                            {birthData.laborEndTime && (
                                <div className="birth-info-card">
                                    <p className="birth-info-label">Doğum Bitiş Zamanı</p>
                                    <p className="birth-info-value">{birthData.laborEndTime}</p>
                                </div>
                            )}
                        </div>

                        {birthData.symptoms && birthData.symptoms.length > 0 && (
                            <div className="symptoms-section">
                                <p className="symptoms-label">Belirtiler</p>
                                <ul className="symptoms-list">
                                    {birthData.symptoms.map((symptom, index) => (
                                        <li key={index}>{symptom}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="empty-message">Doğumla ilgili kayıt bulunmamaktadır.</p>
                )}
            </div>

            {/* Yavruya Olan İlgi */}
            {maternalBehavior && (
                <div className="reproduction-section">
                    <div className="reproduction-header">
                        <h3 className="reproduction-title">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            Yavruya Olan İlgi (Annelik Davranışları)
                        </h3>
                    </div>

                    <div className="maternal-info">
                        <div className="maternal-metric">
                            <p className="birth-info-label">Etkileşim Süresi</p>
                            <p className="birth-info-value">{maternalBehavior.interactionDuration} dakika/gün</p>
                        </div>

                        {maternalBehavior.behaviourNotes && maternalBehavior.behaviourNotes.length > 0 && (
                            <div className="maternal-notes">
                                <p className="notes-label">Davranış Notları</p>
                                <ul className="notes-list">
                                    {maternalBehavior.behaviourNotes.map((note, index) => (
                                        <li key={index}>{note}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {maternalBehavior.cameraFootageUrl && (
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
            )}
        </div>
    );
};

export default AnimalReproduction; 