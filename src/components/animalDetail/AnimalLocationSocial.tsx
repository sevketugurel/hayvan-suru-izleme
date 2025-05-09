import React from 'react';

interface LocationData {
    currentLocation: {
        lat: number;
        lng: number;
    };
    historicalPath: {
        time: string;
        lat: number;
        lng: number;
    }[];
    abnormalLocationAlerts: {
        date: string;
        description: string;
        severity: 'low' | 'medium' | 'high';
    }[];
}

interface SocialData {
    herdInteractions: {
        interaction: string;
        frequency: number;
        animalIds: string[];
    }[];
    closeFriends: {
        animalId: string;
        animalName: string;
        proximityScore: number; // 0-100 arası
    }[];
}

interface AnimalLocationSocialProps {
    locationData: LocationData;
    socialData: SocialData;
}

const AnimalLocationSocial: React.FC<AnimalLocationSocialProps> = ({
    locationData,
    socialData
}) => {
    return (
        <div className="space-y-6">
            {/* GPS ile Konum Takibi */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">GPS ile Konum Takibi</h3>
                <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                    {/* Burada bir harita bileşeni olacak */}
                    <p className="text-gray-400 text-sm">
                        Konum: {locationData.currentLocation.lat.toFixed(6)}, {locationData.currentLocation.lng.toFixed(6)}
                    </p>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Geçmiş Rota</p>
                    <div className="bg-gray-100 p-4 rounded-lg h-32 overflow-y-auto">
                        {locationData.historicalPath.map((point, index) => (
                            <div key={index} className="text-xs text-gray-600 mb-1">
                                {point.time}: {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sürüden Uzaklaşma / Anormal Lokasyon Davranışı */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Sürüden Uzaklaşma / Anormal Lokasyon Davranışı</h3>

                {locationData.abnormalLocationAlerts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Açıklama</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Önem Derecesi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {locationData.abnormalLocationAlerts.map((alert, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{alert.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                                                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'}`}>
                                                {alert.severity === 'high' ? 'Yüksek' :
                                                    alert.severity === 'medium' ? 'Orta' : 'Düşük'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Anormal lokasyon uyarısı bulunmamaktadır.</p>
                )}
            </div>

            {/* Sürünün Sosyal Davranışları */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Sürünün Sosyal Davranışları</h3>

                {socialData.herdInteractions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etkileşim</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sıklık</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etkileşimde Bulunulan Hayvanlar</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {socialData.herdInteractions.map((interaction, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interaction.interaction}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{interaction.frequency} kez/gün</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {interaction.animalIds.join(', ')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">Kayıtlı sosyal etkileşim bulunmamaktadır.</p>
                )}
            </div>

            {/* İneğin Kankalarını Tespit Etme */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Yakın Arkadaşlar</h3>

                {socialData.closeFriends.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialData.closeFriends.map((friend, index) => (
                            <div key={index} className="border rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{friend.animalName}</p>
                                    <p className="text-xs text-gray-500">ID: {friend.animalId}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="w-20 bg-gray-200 rounded-full h-2.5 mb-1">
                                        <div
                                            className="h-2.5 rounded-full bg-blue-600"
                                            style={{ width: `${friend.proximityScore}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500">Yakınlık: {friend.proximityScore}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Yakın arkadaş tespit edilmemiştir.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalLocationSocial; 