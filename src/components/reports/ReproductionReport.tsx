import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

interface ReproductionReportProps {
  dateRange: {
    from: string;
    to: string;
  };
  animalId?: string;
  data?: any;
}

// Mock reproduction data for the report
const mockReproductionData = [
  {
    date: '01.07.2023',
    estrusCycles: 3,
    successfulInseminations: 2,
    births: 0,
    upcomingBirths: 5
  },
  {
    date: '02.07.2023',
    estrusCycles: 2,
    successfulInseminations: 2,
    births: 0,
    upcomingBirths: 5
  },
  {
    date: '03.07.2023',
    estrusCycles: 4,
    successfulInseminations: 3,
    births: 1,
    upcomingBirths: 6
  },
  {
    date: '04.07.2023',
    estrusCycles: 3,
    successfulInseminations: 2,
    births: 0,
    upcomingBirths: 6
  },
  {
    date: '05.07.2023',
    estrusCycles: 2,
    successfulInseminations: 1,
    births: 2,
    upcomingBirths: 4
  },
  {
    date: '06.07.2023',
    estrusCycles: 3,
    successfulInseminations: 3,
    births: 0,
    upcomingBirths: 4
  },
  {
    date: '07.07.2023',
    estrusCycles: 2,
    successfulInseminations: 2,
    births: 1,
    upcomingBirths: 5
  },
];

// Insemination success rate by month
const inseminationData = [
  { name: 'Ocak', successRate: 65 },
  { name: 'Şubat', successRate: 70 },
  { name: 'Mart', successRate: 72 },
  { name: 'Nisan', successRate: 68 },
  { name: 'Mayıs', successRate: 75 },
  { name: 'Haziran', successRate: 78 },
  { name: 'Temmuz', successRate: 73 },
];

// Breeding performance distribution
const breedingPerformanceData = [
  { name: 'Mükemmel', value: 18, color: '#4ade80' },
  { name: 'İyi', value: 45, color: '#60a5fa' },
  { name: 'Ortalama', value: 25, color: '#fbbf24' },
  { name: 'Zayıf', value: 12, color: '#f87171' },
];

// Pregnancy duration scatter data
const pregnancyDurationData = [
  { id: 'A023', duration: 275, weight: 38 },
  { id: 'B017', duration: 280, weight: 42 },
  { id: 'C045', duration: 278, weight: 40 },
  { id: 'D032', duration: 273, weight: 37 },
  { id: 'E021', duration: 282, weight: 44 },
  { id: 'F018', duration: 279, weight: 41 },
  { id: 'G027', duration: 277, weight: 39 },
];

// Expected births data
const upcomingBirthsData = [
  { id: 'H031', name: 'Beyaz', expectedDate: '15.07.2023', daysLeft: 8, inseminationDate: '15.10.2022' },
  { id: 'I042', name: 'Siyah', expectedDate: '18.07.2023', daysLeft: 11, inseminationDate: '18.10.2022' },
  { id: 'J053', name: 'Papatya', expectedDate: '22.07.2023', daysLeft: 15, inseminationDate: '22.10.2022' },
  { id: 'K064', name: 'Çiçek', expectedDate: '25.07.2023', daysLeft: 18, inseminationDate: '25.10.2022' },
  { id: 'L075', name: 'Bulut', expectedDate: '30.07.2023', daysLeft: 23, inseminationDate: '30.10.2022' },
];

const ReproductionReport: React.FC<ReproductionReportProps> = ({ dateRange, animalId, data }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'anomalies' | 'births'>('summary');

  // Gerçek uygulamada veri props üzerinden gelecektir
  const reportData = data || mockReproductionData;

  return (
    <div className="reproduction-report">
      {/* Rapor Başlığı */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {animalId ? `${animalId} Numaralı Hayvan Üreme Raporu` : 'Genel Sürü Üreme Raporu'}
        </h2>
        <p className="text-gray-600">
          {dateRange.from} - {dateRange.to} tarihleri arası üreme verileri analizi
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
          Anormallikler
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'births' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('births')}
        >
          Doğumlar
        </button>
      </div>

      {/* Özet İçeriği */}
      {activeTab === 'summary' && (
        <>
          {/* Üreme Performansı Dağılımı */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Üreme Performansı Dağılımı</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breedingPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {breedingPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} hayvan`, 'Sayı']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tohumlama Başarı Oranı Trendi */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Aylık Tohumlama Başarı Oranı</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={inseminationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="successRate" stroke="#3b82f6" name="Başarı Oranı (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* İkinci Satır Grafikler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Kızgınlık Döngüsü ve Tohumlama Karşılaştırması */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Kızgınlık ve Tohumlama Karşılaştırması</h3>
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
                    <Bar dataKey="estrusCycles" fill="#8b5cf6" name="Kızgınlık Döngüsü" />
                    <Bar dataKey="successfulInseminations" fill="#ec4899" name="Başarılı Tohumlama" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gebelik Süresi ve Buzağı Ağırlığı İlişkisi */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Gebelik Süresi ve Yavru Ağırlığı İlişkisi</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" name="Gebelik Süresi (gün)" type="number" domain={[270, 285]} />
                    <YAxis dataKey="weight" name="Yavru Ağırlığı (kg)" domain={[35, 45]} />
                    <ZAxis range={[60, 400]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value) => [value, value === pregnancyDurationData[0].duration ? 'Gebelik Süresi (gün)' : 'Yavru Ağırlığı (kg)']} />
                    <Legend />
                    <Scatter name="Gebelik Verileri" data={pregnancyDurationData} fill="#10b981" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Doğum ve Yaklaşan Doğum Trendi */}
          <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Doğum ve Yaklaşan Doğum Trendi</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={reportData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="births" stroke="#f97316" name="Doğumlar" />
                  <Line type="monotone" dataKey="upcomingBirths" stroke="#14b8a6" name="Yaklaşan Doğumlar" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rapor Özeti */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Rapor Özeti</h3>
            <p className="text-gray-700 mb-4">
              {dateRange.from} - {dateRange.to} tarihleri arasında sürünün genel üreme performansı <strong>iyi</strong> 
              olarak değerlendirilmiştir. Tohumlama başarı oranı ortalama %73 ile kabul edilebilir düzeydedir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="text-purple-800 font-medium mb-2">Kızgınlık Tespit</h4>
                <p className="text-3xl font-bold text-purple-600">19</p>
                <p className="text-sm text-purple-700">son hafta</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h4 className="text-pink-800 font-medium mb-2">Tohumlama</h4>
                <p className="text-3xl font-bold text-pink-600">15</p>
                <p className="text-sm text-pink-700">başarılı</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="text-orange-800 font-medium mb-2">Doğumlar</h4>
                <p className="text-3xl font-bold text-orange-600">4</p>
                <p className="text-sm text-orange-700">son hafta</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="text-teal-800 font-medium mb-2">Yaklaşan</h4>
                <p className="text-3xl font-bold text-teal-600">5</p>
                <p className="text-sm text-teal-700">önümüzdeki hafta</p>
              </div>
            </div>
            <h4 className="text-md font-medium text-gray-800 mb-2">Öne Çıkan Durumlar</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Genel üreme performansında önceki aya göre %5 artış gözlemlenmiştir.</li>
              <li>Tohumlama başarı oranı son üç ayda istikrarlı bir artış göstermektedir.</li>
              <li>Önümüzdeki 30 gün içinde 12 doğum beklenmektedir.</li>
            </ul>
          </div>
        </>
      )}

      {/* Anormallikler İçeriği */}
      {activeTab === 'anomalies' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tespit Edilen Üreme Anormallikleri</h3>
          <p className="text-gray-600 mb-4">
            {dateRange.from} - {dateRange.to} tarihleri arasında normal üreme aralıklarının dışında ölçülen değerler.
          </p>
          
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
                    Anormallik Türü
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tespit Tarihi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">A023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pamuk</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Düzensiz Kızgınlık Döngüsü</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">14 gün içinde 2 kez kızgınlık</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05.07.2023</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">B017</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Duman</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tekrarlanan Tohumlama</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">3 başarısız tohumlama</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">06.07.2023</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">C045</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Benekli</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Uzun Gebelik Süresi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">290 gün (normal: 275-285 gün)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">07.07.2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Doğumlar İçeriği */}
      {activeTab === 'births' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Yaklaşan Doğumlar</h3>
          <p className="text-gray-600 mb-4">
            Önümüzdeki 30 gün içinde beklenen doğumlar ve detayları.
          </p>
          
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
                    Tohumlama Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tahmini Doğum Tarihi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kalan Gün
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingBirthsData.map((birth) => (
                  <tr key={birth.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{birth.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{birth.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{birth.inseminationDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{birth.expectedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-600 font-medium">{birth.daysLeft} gün</td>
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

export default ReproductionReport; 