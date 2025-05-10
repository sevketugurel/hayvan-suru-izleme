import React from 'react';
import '../styles/AnimalHealthData.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HealthMetric {
    date: string;
    value: number;
}

interface Medication {
    name: string;
    date: string;
    notes: string;
    effect: 'positive' | 'negative' | 'neutral';
}

interface AnimalHealthDataProps {
    pulseRate: {
        current: number;
        history: HealthMetric[];
    };
    stressLevel: {
        current: number;
        history: HealthMetric[];
    };
    bodyTemperature: {
        current: number;
        history: HealthMetric[];
    };
    medications: Medication[];
}

const AnimalHealthData: React.FC<AnimalHealthDataProps> = ({
    pulseRate,
    stressLevel,
    bodyTemperature,
    medications
}) => {
    // Grafik verilerini hazırlama
    const formatChartData = (data: HealthMetric[]) => {
        return data.map(item => ({
            date: new Date(item.date).toLocaleDateString('tr-TR'),
            value: item.value
        }));
    };

    return (
        <div className="health-container">
            <div className="vital-signs-row">
                {/* Nabız Ölçümü Kartı */}
                <div className="vital-card">
                    <div className="vital-header">
                        <h3 className="vital-title">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Nabız
                        </h3>
                        <div className="history-link">
                            Geçmiş
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="vital-body">
                        <div className="vital-value-container">
                            <span className="vital-value pulse-value">{pulseRate.current}</span>
                            <span className="vital-unit">atım/dk</span>
                        </div>
                        <div className="vital-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={formatChartData(pulseRate.history)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                    <YAxis stroke="#6b7280" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={{ fill: '#ef4444', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#ef4444' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Stres Seviyesi Kartı */}
                <div className="vital-card">
                    <div className="vital-header">
                        <h3 className="vital-title">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                            </svg>
                            Stres Seviyesi
                        </h3>
                        <div className="history-link">
                            Geçmiş
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="vital-body">
                        <div className="vital-value-container">
                            <span className="vital-value stress-value">{stressLevel.current}</span>
                            <span className="vital-unit">/ 10</span>
                        </div>
                        <div className="vital-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={formatChartData(stressLevel.history)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                    <YAxis stroke="#6b7280" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4f46e5"
                                        strokeWidth={2}
                                        dot={{ fill: '#4f46e5', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#4f46e5' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Vücut Sıcaklığı Kartı */}
                <div className="vital-card">
                    <div className="vital-header">
                        <h3 className="vital-title">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Vücut Sıcaklığı
                        </h3>
                        <div className="history-link">
                            Geçmiş
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="vital-body">
                        <div className="vital-value-container">
                            <span className="vital-value temperature-value">{bodyTemperature.current}</span>
                            <span className="vital-unit">°C</span>
                        </div>
                        <div className="vital-chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={formatChartData(bodyTemperature.history)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                    <YAxis
                                        stroke="#6b7280"
                                        fontSize={12}
                                        domain={[
                                            (dataMin: number) => Math.floor(dataMin - 0.5),
                                            (dataMax: number) => Math.ceil(dataMax + 0.5)
                                        ]}
                                        tickFormatter={(value) => value.toFixed(1)}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                        formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Sıcaklık']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#f97316"
                                        strokeWidth={2}
                                        dot={{ fill: '#f97316', strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: '#f97316' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* İlaç Etkisi İzleme */}
            <div className="medication-section">
                <div className="medication-header">
                    <h3 className="medication-title">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        İlaç Etkisi İzleme
                    </h3>
                </div>

                {medications.length > 0 ? (
                    <div className="medications-table-container">
                        <table className="medications-table">
                            <thead>
                                <tr>
                                    <th>İlaç</th>
                                    <th>Uygulama Tarihi</th>
                                    <th>Notlar</th>
                                    <th>Etki</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medications.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.name}</td>
                                        <td>{med.date}</td>
                                        <td>{med.notes}</td>
                                        <td>
                                            <span className={`effect-badge effect-${med.effect}`}>
                                                {med.effect === 'positive' ? 'Olumlu' :
                                                    med.effect === 'negative' ? 'Olumsuz' : 'Nötr'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="no-medications">Kayıtlı ilaç uygulaması bulunmamaktadır.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalHealthData; 