import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

interface ActivityReportProps {
  dateRange: {
    from: string;
    to: string;
  };
  animalId?: string;
  data?: any;
}

// Mock activity data for the report
const mockActivityData = [
  {
    date: '01.07.2023',
    avgSteps: 3250,
    avgRestingHours: 12.5,
    avgFeedingTime: 5.2,
    avgActivityScore: 78
  },
  {
    date: '02.07.2023',
    avgSteps: 3180,
    avgRestingHours: 12.8,
    avgFeedingTime: 5.1,
    avgActivityScore: 75
  },
  {
    date: '03.07.2023',
    avgSteps: 3420,
    avgRestingHours: 12.0,
    avgFeedingTime: 5.3,
    avgActivityScore: 82
  },
  {
    date: '04.07.2023',
    avgSteps: 3310,
    avgRestingHours: 12.2,
    avgFeedingTime: 5.0,
    avgActivityScore: 79
  },
  {
    date: '05.07.2023',
    avgSteps: 3050,
    avgRestingHours: 13.1,
    avgFeedingTime: 4.8,
    avgActivityScore: 72
  },
  {
    date: '06.07.2023',
    avgSteps: 3190,
    avgRestingHours: 12.7,
    avgFeedingTime: 5.1,
    avgActivityScore: 76
  },
  {
    date: '07.07.2023',
    avgSteps: 3280,
    avgRestingHours: 12.3,
    avgFeedingTime: 5.2,
    avgActivityScore: 80
  },
];

// Activity level distribution
const activityDistributionData = [
  { name: 'Yüksek Aktivite', value: 23, color: '#4ade80' },
  { name: 'Normal Aktivite', value: 64, color: '#60a5fa' },
  { name: 'Düşük Aktivite', value: 13, color: '#f87171' },
];

// Anomaly data
const anomalyData = [
  { id: 'A023', name: 'Pamuk', abnormality: 'Düşük Aktivite', value: 1200, normalRange: '2500-4000 adım', date: '05.07.2023' },
  { id: 'B017', name: 'Duman', abnormality: 'Uzun Dinlenme Süresi', value: 16.2, normalRange: '10-14 saat', date: '06.07.2023' },
  { id: 'C045', name: 'Benekli', abnormality: 'Düşük Yem Tüketimi', value: 3.1, normalRange: '4.5-6.0 saat', date: '07.07.2023' },
];

const ActivityReport: React.FC<ActivityReportProps> = ({ dateRange, animalId, data }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'anomalies' | 'details'>('summary');

  // Gerçek uygulamada veri props üzerinden gelecektir
  const reportData = data || mockActivityData;

  return (
    <div className="activity-report">
      {/* Rapor Başlığı */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {animalId ? `${animalId} Numaralı Hayvan Aktivite Raporu` : 'Genel Sürü Aktivite Raporu'}
        </h2>
        <p className="text-gray-600">
          {dateRange.from} - {dateRange.to} tarihleri arası aktivite ve davranış verileri analizi
        </p>
      </div>

      {/* Tab Navigasyonu */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('summary')}
        >
          Genel Özet
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'anomalies' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('anomalies')}
        >
          Anomaliler
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Detaylar
        </button>
      </div>

      {/* Özet İçeriği */}
      {activeTab === 'summary' && (
        <>
          {/* Aktivite Seviyesi Dağılımı */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Aktivite Seviyesi Dağılımı</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {activityDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} hayvan`, 'Sayı']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Günlük Adım Sayısı Trendi */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Günlük Adım Sayısı Trendi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[2000, 4000]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgSteps" stroke="#3b82f6" name="Ortalama Adım Sayısı" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* İkinci Satır Grafikler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Dinlenme Süresi Trendi */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Dinlenme Süresi Trendi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[10, 16]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgRestingHours" stroke="#8b5cf6" name="Ortalama Dinlenme Süresi (saat)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Yem Tüketim Süresi Trendi */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Yem Tüketim Süresi Trendi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[3, 7]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgFeedingTime" stroke="#ec4899" name="Ortalama Yem Tüketim Süresi (saat)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Aktivite Skoru Trendi */}
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Genel Aktivite Skoru Trendi</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reportData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgActivityScore" fill="#10b981" name="Ortalama Aktivite Skoru" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rapor Özeti */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Rapor Özeti</h3>
            <p className="text-gray-700 mb-4">
              {dateRange.from} - {dateRange.to} tarihleri arasında sürünün genel aktivite durumu <strong>normal</strong> 
              olarak değerlendirilmiştir. Günlük ortalama adım sayısı, dinlenme ve yem tüketim süreleri normal aralıklar içindedir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="text-blue-800 font-medium mb-2">Ortalama Adım</h4>
                <p className="text-3xl font-bold text-blue-600">3240</p>
                <p className="text-sm text-blue-700">adım/gün</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="text-purple-800 font-medium mb-2">Dinlenme</h4>
                <p className="text-3xl font-bold text-purple-600">12.5</p>
                <p className="text-sm text-purple-700">saat/gün</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="text-pink-800 font-medium mb-2">Yem Tüketimi</h4>
                <p className="text-3xl font-bold text-pink-600">5.1</p>
                <p className="text-sm text-pink-700">saat/gün</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-green-800 font-medium mb-2">Aktivite Skoru</h4>
                <p className="text-3xl font-bold text-green-600">77</p>
                <p className="text-sm text-green-700">ortalama/100</p>
              </div>
            </div>
            <h4 className="text-md font-medium text-gray-800 mb-2">Öne Çıkan Durumlar</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>A023 kodlu hayvanda düşük aktivite seviyesi tespit edilmiştir. İzlenmesi önerilir.</li>
              <li>5 Temmuz'da genel aktivite seviyesinde %8'lik düşüş gözlemlenmiştir, muhtemelen hava koşullarından etkilenmiştir.</li>
              <li>Dinlenme sürelerinin kararlı bir seviyede olması sürünün genel konfor düzeyinin iyi olduğunu göstermektedir.</li>
            </ul>
          </div>
        </>
      )}

      {/* Anomaliler İçeriği */}
      {activeTab === 'anomalies' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tespit Edilen Anormal Davranışlar</h3>
          <p className="text-gray-600 mb-4">
            {dateRange.from} - {dateRange.to} tarihleri arasında normal aktivite ve davranış aralıklarının dışında ölçülen değerler.
          </p>
          
          {anomalyData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hayvan ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İsim
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anormallik
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ölçülen Değer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Normal Aralık
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {anomalyData.map((animal) => (
                    <tr key={animal.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{animal.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.abnormality}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{animal.value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.normalRange}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              İlgili dönemde anormal davranış tespit edilmemiştir.
            </div>
          )}
        </div>
      )}

      {/* Detaylar İçeriği */}
      {activeTab === 'details' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Detaylı Aktivite Verileri</h3>
          <p className="text-gray-600 mb-4">
            {dateRange.from} - {dateRange.to} tarihleri arasındaki günlük aktivite verilerinin detaylı dökümü.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adım Sayısı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dinlenme (saat)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yem Tüketimi (saat)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktivite Skoru
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportData.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{day.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.avgSteps}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.avgRestingHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.avgFeedingTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{day.avgActivityScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityReport; 