import React from 'react';

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
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Nabız Ölçümü Kartı */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-2">Nabız</h3>
                    <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold">{pulseRate.current}</span>
                        <span className="text-gray-500 text-sm">atım/dk</span>
                    </div>
                    <div className="h-32 mt-4 bg-gray-100 rounded flex items-center justify-center">
                        {/* Burada bir grafik bileşeni olacak */}
                        <p className="text-gray-400 text-sm">Nabız grafiği burada görüntülenecek</p>
                    </div>
                </div>

                {/* Stres Seviyesi Kartı */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-2">Stres Seviyesi</h3>
                    <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold">{stressLevel.current}</span>
                        <span className="text-gray-500 text-sm">/ 10</span>
                    </div>
                    <div className="h-32 mt-4 bg-gray-100 rounded flex items-center justify-center">
                        {/* Burada bir grafik bileşeni olacak */}
                        <p className="text-gray-400 text-sm">Stres seviyesi grafiği burada görüntülenecek</p>
                    </div>
                </div>

                {/* Vücut Sıcaklığı Kartı */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-medium mb-2">Vücut Sıcaklığı</h3>
                    <div className="flex items-end space-x-2">
                        <span className="text-2xl font-bold">{bodyTemperature.current}</span>
                        <span className="text-gray-500 text-sm">°C</span>
                    </div>
                    <div className="h-32 mt-4 bg-gray-100 rounded flex items-center justify-center">
                        {/* Burada bir grafik bileşeni olacak */}
                        <p className="text-gray-400 text-sm">Sıcaklık grafiği burada görüntülenecek</p>
                    </div>
                </div>
            </div>

            {/* İlaç Etkisi İzleme */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">İlaç Etkisi İzleme</h3>

                {medications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlaç</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uygulama Tarihi</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notlar</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etki</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {medications.map((med, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{med.notes}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${med.effect === 'positive' ? 'bg-green-100 text-green-800' :
                                                    med.effect === 'negative' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
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
                    <p className="text-gray-500">Kayıtlı ilaç uygulaması bulunmamaktadır.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalHealthData; 