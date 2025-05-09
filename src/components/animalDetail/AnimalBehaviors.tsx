import React from 'react';

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
        <div className="space-y-6">
            {/* Uyku ve Dinlenme Kalitesi */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Uyku ve Dinlenme Kalitesi</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Toplam Süre</p>
                        <p className="text-2xl font-bold">{sleepQuality.duration} saat</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Periyot Sayısı</p>
                        <p className="text-2xl font-bold">{sleepQuality.periods}</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Kalite Puanı</p>
                        <p className="text-2xl font-bold">{sleepQuality.qualityScore}/10</p>
                    </div>
                </div>
                <div className="h-48 mt-6 bg-gray-100 rounded flex items-center justify-center">
                    {/* Burada bir grafik bileşeni olacak */}
                    <p className="text-gray-400 text-sm">Uyku kalitesi grafiği burada görüntülenecek</p>
                </div>
            </div>

            {/* Dinlenme / Ayakta Kalma Süresi */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Dinlenme / Ayakta Kalma Süresi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Dinlenme</p>
                        <p className="text-2xl font-bold">{restingStandingRatio.resting} saat</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Ayakta Kalma</p>
                        <p className="text-2xl font-bold">{restingStandingRatio.standing} saat</p>
                    </div>
                </div>
                <div className="h-48 mt-6 bg-gray-100 rounded flex items-center justify-center">
                    {/* Burada bir grafik bileşeni olacak */}
                    <p className="text-gray-400 text-sm">Dinlenme/Ayakta kalma oranı grafiği burada görüntülenecek</p>
                </div>
            </div>

            {/* Geviş Getirme Sayısı */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Geviş Getirme Sayısı</h3>
                <div className="border rounded-lg p-4 inline-block">
                    <p className="text-sm text-gray-500">Günlük Toplam</p>
                    <p className="text-2xl font-bold">{ruminationCount.daily}</p>
                </div>
                <div className="h-48 mt-6 bg-gray-100 rounded flex items-center justify-center">
                    {/* Burada bir grafik bileşeni olacak */}
                    <p className="text-gray-400 text-sm">Saatlik geviş getirme grafiği burada görüntülenecek</p>
                </div>
            </div>

            {/* Adım Sayısı ve Hareketlilik */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Adım Sayısı ve Hareketlilik</h3>
                <div className="border rounded-lg p-4 inline-block">
                    <p className="text-sm text-gray-500">Günlük Adım</p>
                    <p className="text-2xl font-bold">{stepCount.daily}</p>
                </div>
                <div className="h-48 mt-6 bg-gray-100 rounded flex items-center justify-center">
                    {/* Burada bir grafik bileşeni olacak */}
                    <p className="text-gray-400 text-sm">Günlük aktivite grafiği burada görüntülenecek</p>
                </div>
            </div>

            {/* Yem Yeme Süresi */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Yem Yeme Süresi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Günlük Süre</p>
                        <p className="text-2xl font-bold">{feedingDuration.daily} dakika</p>
                    </div>
                    <div className="border rounded-lg p-4">
                        <p className="text-sm text-gray-500">Sıklık</p>
                        <p className="text-2xl font-bold">{feedingDuration.frequency} kez/gün</p>
                    </div>
                </div>
                {feedingDuration.cameraFootageUrl ? (
                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2">Kamera Görüntüsü</p>
                        <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                            {/* Burada bir video bileşeni olacak */}
                            <p className="text-gray-400 text-sm">Kamera görüntüsüne erişmek için tıklayın</p>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-gray-500">Kamera görüntüsü mevcut değil.</p>
                )}
            </div>
        </div>
    );
};

export default AnimalBehaviors; 