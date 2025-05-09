import React from 'react';

interface RiskData {
    drowningRisks: {
        date: string;
        location: string;
        distance: number; // metre
        severity: 'low' | 'medium' | 'high';
    }[];
}

interface EnvironmentData {
    gasLevels?: {
        ammonia: number; // ppm
        methane: number; // ppm
        date: string;
        history: {
            date: string;
            ammonia: number;
            methane: number;
        }[];
    };
}

interface AnimalRiskEnvironmentProps {
    riskData: RiskData;
    environmentData?: EnvironmentData;
}

const AnimalRiskEnvironment: React.FC<AnimalRiskEnvironmentProps> = ({
    riskData,
    environmentData
}) => {
    return (
        <div className="space-y-6">
            {/* Boğulma Riski */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Boğulma Riski</h3>

                {riskData.drowningRisks.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tehlikeli Bölge</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mesafe</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Seviyesi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {riskData.drowningRisks.map((risk, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{risk.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{risk.location}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{risk.distance} m</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                                                    risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'}`}>
                                                {risk.severity === 'high' ? 'Yüksek' :
                                                    risk.severity === 'medium' ? 'Orta' : 'Düşük'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Boğulma riski tespiti bulunmamaktadır.</p>
                )}
            </div>

            {/* Ortamdaki Gaz Seviyeleri */}
            {environmentData?.gasLevels && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Ortamdaki Gaz Seviyeleri</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500">Amonyak (NH₃)</p>
                            <div className="flex items-end space-x-2">
                                <span className="text-2xl font-bold">{environmentData.gasLevels.ammonia}</span>
                                <span className="text-gray-500 text-sm">ppm</span>
                            </div>
                            <div className={`mt-2 text-xs ${environmentData.gasLevels.ammonia > 25 ? 'text-red-600' :
                                    environmentData.gasLevels.ammonia > 10 ? 'text-yellow-600' :
                                        'text-green-600'
                                }`}>
                                {environmentData.gasLevels.ammonia > 25 ? 'Tehlikeli seviye' :
                                    environmentData.gasLevels.ammonia > 10 ? 'Dikkat edilmeli' :
                                        'Normal seviye'}
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500">Metan (CH₄)</p>
                            <div className="flex items-end space-x-2">
                                <span className="text-2xl font-bold">{environmentData.gasLevels.methane}</span>
                                <span className="text-gray-500 text-sm">ppm</span>
                            </div>
                            <div className={`mt-2 text-xs ${environmentData.gasLevels.methane > 1000 ? 'text-red-600' :
                                    environmentData.gasLevels.methane > 500 ? 'text-yellow-600' :
                                        'text-green-600'
                                }`}>
                                {environmentData.gasLevels.methane > 1000 ? 'Tehlikeli seviye' :
                                    environmentData.gasLevels.methane > 500 ? 'Dikkat edilmeli' :
                                        'Normal seviye'}
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">Son Ölçüm: {environmentData.gasLevels.date}</p>

                    <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                        {/* Burada bir grafik bileşeni olacak */}
                        <p className="text-gray-400 text-sm">Gaz seviyeleri geçmiş grafiği burada görüntülenecek</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimalRiskEnvironment; 