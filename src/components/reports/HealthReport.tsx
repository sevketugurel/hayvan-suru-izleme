import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

interface HealthReportProps {
  dateRange: {
    from: string;
    to: string;
  };
  animalId?: string;
  data?: any;
}

const mockHealthData = [
  {
    date: '01.07.2023',
    avgTemperature: 38.2,
    avgHeartRate: 72,
    avgStressLevel: 2.1,
    treatmentCount: 1,
  },
  {
    date: '02.07.2023',
    avgTemperature: 38.1,
    avgHeartRate: 71,
    avgStressLevel: 1.8,
    treatmentCount: 0,
  },
  {
    date: '03.07.2023',
    avgTemperature: 38.3,
    avgHeartRate: 74,
    avgStressLevel: 2.3,
    treatmentCount: 2,
  },
  {
    date: '04.07.2023',
    avgTemperature: 38.4,
    avgHeartRate: 76,
    avgStressLevel: 2.5,
    treatmentCount: 1,
  },
  {
    date: '05.07.2023',
    avgTemperature: 38.2,
    avgHeartRate: 73,
    avgStressLevel: 2.0,
    treatmentCount: 0,
  },
  {
    date: '06.07.2023',
    avgTemperature: 38.1,
    avgHeartRate: 70,
    avgStressLevel: 1.9,
    treatmentCount: 0,
  },
  {
    date: '07.07.2023',
    avgTemperature: 38.0,
    avgHeartRate: 69,
    avgStressLevel: 1.7,
    treatmentCount: 0,
  },
];

const healthStatusData = [
  { name: 'Sağlıklı', value: 87, color: '#4ade80' },
  { name: 'Risk Altında', value: 7, color: '#fbbf24' },
  { name: 'Hasta', value: 4, color: '#f87171' },
  { name: 'Tedavi Altında', value: 3, color: '#60a5fa' },
];

const COLORS = ['#4ade80', '#fbbf24', '#f87171', '#60a5fa'];

// Anomali tespit edilen hayvanlar
const anomalyAnimals = [
  { id: 'A023', name: 'Pamuk', abnormality: 'Yüksek Vücut Sıcaklığı', value: 39.5, normalRange: '38.0-39.0°C', date: '05.07.2023' },
  { id: 'B017', name: 'Duman', abnormality: 'Düşük Nabız', value: 54, normalRange: '60-80 bpm', date: '06.07.2023' },
  { id: 'C045', name: 'Benekli', abnormality: 'Yüksek Stres Seviyesi', value: 4.2, normalRange: '1.0-3.0', date: '07.07.2023' },
];

const treatmentData = [
  { id: 'A023', name: 'Pamuk', diagnosis: 'Hafif Ateş', treatment: 'Antibiyotik', date: '05.07.2023', vet: 'Dr. Ahmet' },
  { id: 'A045', name: 'Benekli', diagnosis: 'Solunum Zorluğu', treatment: 'Bronkodilatör', date: '03.07.2023', vet: 'Dr. Ayşe' },
  { id: 'B012', name: 'Sarı', diagnosis: 'Sindirim Problemi', treatment: 'Probiyotik', date: '03.07.2023', vet: 'Dr. Ahmet' },
];

const HealthReport: React.FC<HealthReportProps> = ({ dateRange, animalId, data }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'anomalies' | 'treatments'>('summary');

  // Gerçek uygulamada veri props üzerinden gelecektir
  const reportData = data || mockHealthData;

  return (
    <div className="health-report">
      {/* Rapor Başlığı */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {animalId ? `${animalId} Numaralı Hayvan Sağlık Raporu` : 'Genel Sürü Sağlık Raporu'}
        </h2>
        <p className="text-gray-600">
          {dateRange.from} - {dateRange.to} tarihleri arası sağlık verileri analizi
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
            activeTab === 'treatments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('treatments')}
        >
          Tedaviler
        </button>
      </div>

      {/* Özet İçeriği */}
      {activeTab === 'summary' && (
        <>
          {/* Sağlık Durumu Dağılımı */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Sağlık Durumu Dağılımı</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {healthStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} hayvan`, 'Sayı']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ortalama Değerler Trend Grafiği */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Vücut Sıcaklığı Trendi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[37.5, 39.5]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgTemperature" stroke="#3b82f6" name="Ortalama Vücut Sıcaklığı (°C)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* İkinci Satır Grafikler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Nabız Trend Grafiği */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Nabız Trendi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[50, 90]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgHeartRate" stroke="#ec4899" name="Ortalama Nabız (bpm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stres Seviyesi Trend Grafiği */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Stres Seviyesi Trendi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgStressLevel" stroke="#8b5cf6" name="Ortalama Stres Seviyesi" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tedavi İhtiyacı Trend Grafiği */}
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Tedavi Gerektiren Durum Sayısı</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reportData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="treatmentCount" fill="#f97316" name="Tedavi Gerektiren Durum Sayısı" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rapor Özeti */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Rapor Özeti</h3>
            <p className="text-gray-700 mb-4">
              {dateRange.from} - {dateRange.to} tarihleri arasında sürünün genel sağlık durumu <strong>iyi</strong> 
              olarak değerlendirilmiştir. Ortalama vücut sıcaklığı, nabız ve stres seviyeleri normal aralıklar içindedir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-green-800 font-medium mb-2">Sağlıklı Hayvanlar</h4>
                <p className="text-3xl font-bold text-green-600">87</p>
                <p className="text-sm text-green-700">Tüm sürünün %92'si</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-yellow-800 font-medium mb-2">Risk Altındakiler</h4>
                <p className="text-3xl font-bold text-yellow-600">7</p>
                <p className="text-sm text-yellow-700">Yakın takip altında</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="text-red-800 font-medium mb-2">Tedavi Edilenler</h4>
                <p className="text-3xl font-bold text-red-600">3</p>
                <p className="text-sm text-red-700">Son hafta içinde</p>
              </div>
            </div>
            <h4 className="text-md font-medium text-gray-800 mb-2">Öne Çıkan Durumlar</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>B-12 vitamini eksikliği belirtileri gösteren hayvanlar için ek vitamin takviyesi önerilmiştir.</li>
              <li>C045 kodlu hayvanda yüksek stres seviyesi tespit edilmiş, izolasyon önerilmiştir.</li>
              <li>Genel olarak sürü sağlığında iyileşme trendi gözlemlenmektedir.</li>
            </ul>
          </div>
        </>
      )}

      {/* Anomaliler İçeriği */}
      {activeTab === 'anomalies' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tespit Edilen Anormal Değerler</h3>
          <p className="text-gray-600 mb-4">
            {dateRange.from} - {dateRange.to} tarihleri arasında normal aralıkların dışında ölçülen değerler ve ilgili hayvanlar.
          </p>
          
          {anomalyAnimals.length > 0 ? (
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
                  {anomalyAnimals.map((animal) => (
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
              İlgili dönemde anormal değer tespit edilmemiştir.
            </div>
          )}
        </div>
      )}

      {/* Tedaviler İçeriği */}
      {activeTab === 'treatments' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Uygulanan Tedaviler</h3>
          <p className="text-gray-600 mb-4">
            {dateRange.from} - {dateRange.to} tarihleri arasında hayvanlara uygulanan tedaviler ve sonuçları.
          </p>
          
          {treatmentData.length > 0 ? (
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
                      Teşhis
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uygulanan Tedavi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Veteriner
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {treatmentData.map((treatment) => (
                    <tr key={treatment.id + treatment.date} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{treatment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.diagnosis}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.treatment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{treatment.vet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              İlgili dönemde uygulanan tedavi bulunmamaktadır.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthReport; 