import React from 'react';

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
        <div className="space-y-6">
            {/* Kızgınlık Dönemi Takibi */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Kızgınlık Dönemi Takibi</h3>

                {heatCycles.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Belirtiler</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesinlik</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {heatCycles.map((cycle, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cycle.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <ul className="list-disc pl-5">
                                                {cycle.symptoms.map((symptom, idx) => (
                                                    <li key={idx}>{symptom}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${cycle.certainty > 75 ? 'bg-green-600' :
                                                            cycle.certainty > 50 ? 'bg-yellow-400' :
                                                                'bg-red-500'
                                                        }`}
                                                    style={{ width: `${cycle.certainty}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-1 block">%{cycle.certainty}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Kayıtlı kızgınlık döngüsü bulunmamaktadır.</p>
                )}
            </div>

            {/* Doğum Anı Tespiti */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Doğum Anı Tespiti</h3>

                {birthData.status !== 'none' ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {birthData.expectedDate && (
                                <div className="border rounded-lg p-4">
                                    <p className="text-sm text-gray-500">Beklenen Doğum Tarihi</p>
                                    <p className="text-xl font-bold">{birthData.expectedDate}</p>
                                </div>
                            )}

                            <div className="border rounded-lg p-4">
                                <p className="text-sm text-gray-500">Durum</p>
                                <p className="text-xl font-bold">
                                    {birthData.status === 'waiting' && 'Bekleniyor'}
                                    {birthData.status === 'in_progress' && 'Doğum Başladı'}
                                    {birthData.status === 'completed' && 'Tamamlandı'}
                                </p>
                            </div>

                            {birthData.laborStartTime && (
                                <div className="border rounded-lg p-4">
                                    <p className="text-sm text-gray-500">Doğum Başlangıç Zamanı</p>
                                    <p className="text-xl font-bold">{birthData.laborStartTime}</p>
                                </div>
                            )}

                            {birthData.laborEndTime && (
                                <div className="border rounded-lg p-4">
                                    <p className="text-sm text-gray-500">Doğum Bitiş Zamanı</p>
                                    <p className="text-xl font-bold">{birthData.laborEndTime}</p>
                                </div>
                            )}
                        </div>

                        {birthData.symptoms && birthData.symptoms.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-2">Belirtiler</p>
                                <ul className="list-disc pl-5">
                                    {birthData.symptoms.map((symptom, index) => (
                                        <li key={index} className="text-gray-700">{symptom}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-500">Doğumla ilgili kayıt bulunmamaktadır.</p>
                )}
            </div>

            {/* Yavruya Olan İlgi */}
            {maternalBehavior && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Yavruya Olan İlgi (Annelik Davranışları)</h3>

                    <div className="border rounded-lg p-4 inline-block mb-4">
                        <p className="text-sm text-gray-500">Etkileşim Süresi</p>
                        <p className="text-2xl font-bold">{maternalBehavior.interactionDuration} dakika/gün</p>
                    </div>

                    {maternalBehavior.behaviourNotes && maternalBehavior.behaviourNotes.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 mb-2">Davranış Notları</p>
                            <ul className="list-disc pl-5">
                                {maternalBehavior.behaviourNotes.map((note, index) => (
                                    <li key={index} className="text-gray-700">{note}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {maternalBehavior.cameraFootageUrl && (
                        <div className="mt-6">
                            <p className="text-sm text-gray-500 mb-2">Kamera Görüntüsü</p>
                            <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                                {/* Burada bir video bileşeni olacak */}
                                <p className="text-gray-400 text-sm">Kamera görüntüsüne erişmek için tıklayın</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnimalReproduction; 