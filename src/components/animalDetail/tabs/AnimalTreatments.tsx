import React, { useRef, useState } from 'react';
import '../styles/AnimalTreatments.css';

// Geçmiş tedaviler için arayüz
interface PastTreatment {
    id: string;
    date: string;
    diagnosis: string;
    treatment: string;
    medications: {
        name: string;
        dosage: string;
        method: string;
    }[];
    veterinarian: string;
    result: string;
    notes?: string;
}

// Aktif tedaviler için arayüz
interface ActiveTreatment {
    id: string;
    startDate: string;
    estimatedEndDate: string;
    diagnosis: string;
    treatmentPlan: string;
    medicationSchedule: {
        medication: string;
        dosage: string;
        frequency: string;
        method: string;
        remainingDays: number;
    }[];
    progress: number; // 0-100 arası yüzdelik değer
    notes?: string;
}

// Aşı takibi için arayüz
interface Vaccination {
    id: string;
    name: string;
    date: string;
    status: 'completed' | 'scheduled' | 'overdue';
    validUntil?: string;
    veterinarian?: string;
    reactions?: string[];
    notes?: string;
}

// Hastalık geçmişi için arayüz
interface DiseaseHistory {
    id: string;
    diseaseName: string;
    diagnosisDate: string;
    recoveryDate?: string;
    duration: number; // gün sayısı
    severity: 'low' | 'medium' | 'high';
    treatment: string;
    recurrenceRisk: number; // 0-100 arası yüzdelik değer
    notes?: string;
}

// İlaç kullanım raporu için arayüz
interface MedicationUsage {
    medicationName: string;
    totalUsage: number;
    unit: string;
    administrationMethods: string[];
    lastUsed: string;
    effectivenessScore?: number; // 0-100 arası yüzdelik değer
}

// Ana bileşen props arayüzü
interface AnimalTreatmentsProps {
    pastTreatments: PastTreatment[];
    activeTreatments: ActiveTreatment[];
    vaccinations: Vaccination[];
    diseaseHistory: DiseaseHistory[];
    medicationUsage: MedicationUsage[];
}

const AnimalTreatments: React.FC<AnimalTreatmentsProps> = ({
    pastTreatments,
    activeTreatments,
    vaccinations,
    diseaseHistory,
    medicationUsage
}) => {
    // Hastalık geçmişi için slider ref'i
    const diseaseSliderRef = useRef<HTMLDivElement>(null);

    // Sağ oka tıklayınca kaydır
    const handleNextDisease = () => {
        if (diseaseSliderRef.current) {
            diseaseSliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };

    // Sola kaydırmak için fonksiyon
    const handlePrevDisease = () => {
        if (diseaseSliderRef.current) {
            diseaseSliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
        }
    };

    // İlaç kullanım raporu için slider ref'i ve scroll pozisyonu
    const medicationSliderRef = useRef<HTMLDivElement>(null);


    // Sağ oka tıklayınca kaydır
    const handleNextMedication = () => {
        if (medicationSliderRef.current) {
            medicationSliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
    };
    // Sola kaydırmak için fonksiyon
    const handlePrevMedication = () => {
        if (medicationSliderRef.current) {
            medicationSliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
        }
    };

    // Örnek olarak bir hastalık daha ekliyoruz (statik)
    const extendedDiseaseHistory = [
        ...diseaseHistory,
        {
            id: 'd4',
            diseaseName: 'Solunum Yolu Enfeksiyonu',
            diagnosisDate: '2024-02-10',
            recoveryDate: '2024-02-18',
            duration: 8,
            severity: 'medium',
            treatment: 'Antibiyotik ve destekleyici bakım',
            recurrenceRisk: 20,
            notes: 'Öksürük ve burun akıntısı gözlendi.'
        }
    ];

    // Örnek olarak geçmiş tedavilere birkaç tedavi daha ekliyoruz (statik)
    const extendedPastTreatments = [
        ...pastTreatments,
        {
            id: 't4',
            date: '2024-01-15',
            diagnosis: 'Solunum Yolu Enfeksiyonu',
            treatment: 'Antibiyotik ve destekleyici bakım',
            medications: [
                { name: 'Enrofloxacin', dosage: '5ml/100kg', method: 'IM enjeksiyon' },
                { name: 'Vitamin C', dosage: '10ml', method: 'Oral' }
            ],
            veterinarian: 'Dr. Zeynep Kaya',
            result: 'İyileşti, izleniyor',
            notes: 'Hafif ateş ve öksürük vardı.'
        },
        {
            id: 't5',
            date: '2023-12-10',
            diagnosis: 'İshallik',
            treatment: 'Sıvı desteği ve probiyotik',
            medications: [
                { name: 'Probiyotik', dosage: '1 paket', method: 'Oral' }
            ],
            veterinarian: 'Dr. Ali Can',
            result: 'Tamamen İyileşti',
            notes: 'Beslenme düzeni değiştirildi.'
        },
        {
            id: 't6',
            date: '2023-11-05',
            diagnosis: 'Kuduz Aşısı',
            treatment: 'Aşı uygulaması',
            medications: [
                { name: 'Kuduz Aşısı', dosage: '1 doz', method: 'IM enjeksiyon' }
            ],
            veterinarian: 'Dr. Ayşe Demir',
            result: 'Tamamen İyileşti',
            notes: 'Aşı sonrası hafif halsizlik gözlendi.'
        }
    ];

    // İlaç kullanım raporuna 4 yeni örnek ekle
    const extendedMedicationUsage = [
        ...medicationUsage,
        {
            medicationName: 'Mineral Takviyeleri',
            totalUsage: 3,
            unit: 'kg',
            administrationMethods: ['Yem katkısı'],
            lastUsed: '2024-09-10',
            effectivenessScore: 80
        },
        {
            medicationName: 'Ağrı Kesiciler',
            totalUsage: 60,
            unit: 'ml',
            administrationMethods: ['IM enjeksiyon'],
            lastUsed: '2024-10-03',
            effectivenessScore: 75
        },
        {
            medicationName: 'Elektrolit Çözeltileri',
            totalUsage: 2,
            unit: 'L',
            administrationMethods: ['Oral'],
            lastUsed: '2024-09-28',
            effectivenessScore: 65
        },
        {
            medicationName: 'Probiyotikler',
            totalUsage: 5,
            unit: 'paket',
            administrationMethods: ['Oral'],
            lastUsed: '2024-09-15',
            effectivenessScore: 60
        }
    ];

    return (
        <div className="treatments-container">
            {/* Aktif Tedaviler */}
            <div className="treatment-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        Aktif Tedaviler
                    </h3>
                </div>

                {activeTreatments.length > 0 ? (
                    <div className="active-treatments-list">
                        {activeTreatments.map((treatment) => (
                            <div key={treatment.id} className="active-treatment-card">
                                <div className="treatment-header">
                                    <h4 className="treatment-diagnosis">{treatment.diagnosis}</h4>
                                    <span className="treatment-dates">
                                        {treatment.startDate} - {treatment.estimatedEndDate}
                                    </span>
                                </div>

                                <div className="treatment-details">
                                    <p className="treatment-plan"><strong>Tedavi Planı:</strong> {treatment.treatmentPlan}</p>

                                    <div className="progress-container">
                                        <p className="progress-label">İlerleme:</p>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${treatment.progress}%` }}>
                                            </div>
                                        </div>
                                        <span className="progress-value">%{treatment.progress}</span>
                                    </div>
                                </div>

                                <div className="medication-schedule">
                                    <h5 className="schedule-title">İlaç Uygulama Takvimi</h5>
                                    <table className="schedule-table">
                                        <thead>
                                            <tr>
                                                <th>İlaç</th>
                                                <th>Dozaj</th>
                                                <th>Sıklık</th>
                                                <th>Yöntem</th>
                                                <th>Kalan Gün</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {treatment.medicationSchedule.map((med, idx) => (
                                                <tr key={idx}>
                                                    <td>{med.medication}</td>
                                                    <td>{med.dosage}</td>
                                                    <td>{med.frequency}</td>
                                                    <td>{med.method}</td>
                                                    <td>{med.remainingDays}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {treatment.notes && (
                                    <div className="treatment-notes">
                                        <p className="notes-label">Notlar:</p>
                                        <p className="notes-content">{treatment.notes}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="empty-message">Aktif tedavi bulunmamaktadır.</p>
                )}
            </div>

            {/* Aşı Takibi */}
            <div className="treatment-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Aşı Takibi
                    </h3>
                </div>

                {vaccinations.length > 0 ? (
                    <table className="vaccinations-table">
                        <thead>
                            <tr>
                                <th>Aşı Adı</th>
                                <th>Tarih</th>
                                <th>Durum</th>
                                <th>Geçerlilik</th>
                                <th>Uygulayan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaccinations.map((vaccination) => (
                                <tr key={vaccination.id}>
                                    <td>{vaccination.name}</td>
                                    <td>{vaccination.date}</td>
                                    <td>
                                        <span className={`status-badge status-${vaccination.status}`}>
                                            {vaccination.status === 'completed' ? 'Tamamlandı' :
                                                vaccination.status === 'scheduled' ? 'Planlandı' :
                                                    'Gecikmiş'}
                                        </span>
                                    </td>
                                    <td>{vaccination.validUntil || '-'}</td>
                                    <td>{vaccination.veterinarian || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="empty-message">Aşı kaydı bulunmamaktadır.</p>
                )}
            </div>

            {/* Hastalık Geçmişi */}
            <div className="treatment-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Hastalık Geçmişi
                    </h3>

                </div>

                {extendedDiseaseHistory.length > 0 ? (
                    <div className="disease-history-slider-wrapper">
                        <div className="disease-slider-buttons">
                            <button className="disease-slider-prev" onClick={handlePrevDisease} title="Önceki">
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#2196f3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <button className="disease-slider-next" onClick={handleNextDisease} title="Sonraki">
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#2196f3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>
                        <div className="disease-history-slider" ref={diseaseSliderRef}>
                            {extendedDiseaseHistory.map((disease) => (
                                <div key={disease.id} className="disease-card">
                                    <div className="disease-header">
                                        <h4 className="disease-name">{disease.diseaseName}</h4>
                                        <span className={`severity-badge severity-${disease.severity}`}>
                                            {disease.severity === 'high' ? 'Yüksek Şiddet' :
                                                disease.severity === 'medium' ? 'Orta Şiddet' :
                                                    'Düşük Şiddet'}
                                        </span>
                                    </div>

                                    <div className="disease-dates">
                                        <span className="diagnosis-date">Teşhis: {disease.diagnosisDate}</span>
                                        {disease.recoveryDate && (
                                            <span className="recovery-date">İyileşme: {disease.recoveryDate}</span>
                                        )}
                                        <span className="duration">Süre: {disease.duration} gün</span>
                                    </div>

                                    <div className="disease-details">
                                        <p className="treatment-info"><strong>Uygulanan Tedavi:</strong> {disease.treatment}</p>

                                        <div className="recurrence-risk">
                                            <p className="risk-label">Tekrarlama Riski:</p>
                                            <div className="risk-bar">
                                                <div
                                                    className={`risk-fill ${disease.recurrenceRisk > 70 ? 'high-risk' :
                                                        disease.recurrenceRisk > 30 ? 'medium-risk' :
                                                            'low-risk'
                                                        }`}
                                                    style={{ width: `${disease.recurrenceRisk}%` }}>
                                                </div>
                                            </div>
                                            <span className="risk-value">%{disease.recurrenceRisk}</span>
                                        </div>
                                    </div>

                                    {disease.notes && (
                                        <div className="disease-notes">
                                            <p className="notes-label">Notlar:</p>
                                            <p className="notes-content">{disease.notes}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="empty-message">Hastalık geçmişi bulunmamaktadır.</p>
                )}
            </div>

            {/* Geçmiş Tedaviler */}
            <div className="treatment-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Geçmiş Tedaviler
                    </h3>
                </div>

                {extendedPastTreatments.length > 0 ? (
                    <div className="past-treatments-table-wrapper">
                        <table className="past-treatments-table">
                            <thead>
                                <tr>
                                    <th>Tarih</th>
                                    <th>Teşhis</th>
                                    <th>Tedavi</th>
                                    <th>İlaçlar</th>
                                    <th>Veteriner</th>
                                    <th>Sonuç</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extendedPastTreatments.map((treatment) => (
                                    <tr key={treatment.id}>
                                        <td>{treatment.date}</td>
                                        <td>{treatment.diagnosis}</td>
                                        <td>{treatment.treatment}</td>
                                        <td>
                                            <ul className="medications-list">
                                                {treatment.medications.map((med, idx) => (
                                                    <li key={idx}>{med.name} ({med.dosage}, {med.method})</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{treatment.veterinarian}</td>
                                        <td className={`treatment-result ${treatment.result.includes('İyileşti') ? 'result-success' :
                                            treatment.result.includes('Başarısız') ? 'result-failure' :
                                                'result-neutral'
                                            }`}>
                                            {treatment.result}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="empty-message">Geçmiş tedavi bulunmamaktadır.</p>
                )}
            </div>

            {/* İlaç Kullanım Raporu */}
            <div className="treatment-section">
                <div className="section-header">
                    <h3 className="section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                        </svg>
                        İlaç Kullanım Raporu
                    </h3>
                </div>

                {extendedMedicationUsage.length > 0 ? (
                    <div className="medication-usage-slider-section">
                        <div className="medication-slider-buttons">
                            <button className="medication-slider-prev" onClick={handlePrevMedication} title="Önceki"  >
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#2196f3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            <button className="medication-slider-next" onClick={handleNextMedication} title="Sonraki"  >
                                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#2196f3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>
                        <div className="medication-usage-slider-wrapper">
                            <div className="medication-usage-slider" ref={medicationSliderRef}>
                                {extendedMedicationUsage.map((medication, index) => (
                                    <div key={index} className="medication-card">
                                        <h4 className="medication-name">{medication.medicationName}</h4>
                                        <div className="medication-details">
                                            <div className="usage-info">
                                                <p className="total-usage"><strong>Toplam Kullanım:</strong> {medication.totalUsage} {medication.unit}</p>
                                                <p className="last-used"><strong>Son Kullanım:</strong> {medication.lastUsed}</p>
                                            </div>
                                            <div className="administration-methods">
                                                <p className="methods-label"><strong>Uygulama Yöntemleri:</strong></p>
                                                <ul className="methods-list">
                                                    {medication.administrationMethods.map((method, idx) => (
                                                        <li key={idx}>{method}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        {medication.effectivenessScore !== undefined && (
                                            <div className="effectiveness-container">
                                                <p className="effectiveness-label">Etkinlik:</p>
                                                <div className="effectiveness-bar">
                                                    <div
                                                        className={`effectiveness-fill ${medication.effectivenessScore > 75 ? 'high-effectiveness' :
                                                            medication.effectivenessScore > 50 ? 'medium-effectiveness' :
                                                                'low-effectiveness'
                                                            }`}
                                                        style={{ width: `${medication.effectivenessScore}%` }}>
                                                    </div>
                                                </div>
                                                <span className="effectiveness-value">%{medication.effectivenessScore}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="empty-message">İlaç kullanım kaydı bulunmamaktadır.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalTreatments; 