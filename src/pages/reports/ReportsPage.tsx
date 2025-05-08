import React, { useState } from 'react';
import { 
  mockReportTypes, 
  mockReportAnimals, 
  mockHealthData,
  mockSavedReports 
} from '../../mocks';

const ReportsPage: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('health');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [hasSavedReports, setHasSavedReports] = useState(!!mockSavedReports.length);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  return (
    <div className="reports-container max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Raporlar</h1>
        <p className="text-gray-600">SürüGözü çiftlik verilerinizi analiz edin ve özel raporlar oluşturun</p>
      </div>
      
      {/* Report Generator Card */}
      <div className="bg-white rounded-xl shadow mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-lg font-semibold text-white">Rapor Oluşturucu</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Report Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rapor Türü</label>
              <div className="relative">
                <select
                  className="w-full appearance-none border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                >
                  {mockReportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Date Range Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    className="border-gray-300 rounded-lg shadow-sm pl-10 py-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    className="border-gray-300 rounded-lg shadow-sm pl-10 py-2 focus:ring-blue-500 focus:border-blue-500 block w-full"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            
            {/* Animal Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hayvan</label>
              <div className="relative">
                <select
                  className="w-full appearance-none border-gray-300 rounded-lg shadow-sm py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedAnimal}
                  onChange={(e) => setSelectedAnimal(e.target.value)}
                >
                  <option value="">Tüm Hayvanlar</option>
                  {mockReportAnimals.map(animal => (
                    <option key={animal.id} value={animal.id}>{animal.name} {animal.tag}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
            <button
              className={`px-6 py-3 rounded-lg font-medium text-white flex items-center ${
                isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Rapor Oluşturuluyor...
                </>
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Raporu Oluştur
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Report Results */}
      {reportGenerated && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h2 className="text-lg font-semibold text-white">
                {mockReportTypes.find(r => r.id === selectedReportType)?.name} Sonuçları
              </h2>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white text-green-700 rounded-md hover:bg-green-50 flex items-center shadow-sm transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </button>
              <button className="px-3 py-1 bg-white text-green-700 rounded-md hover:bg-green-50 flex items-center shadow-sm transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Excel
              </button>
              <button className="px-3 py-1 bg-white text-green-700 rounded-md hover:bg-green-50 flex items-center shadow-sm transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Yazdır
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Report summary section */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Rapor Özeti</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Rapor Türü</p>
                  <p className="font-medium">{mockReportTypes.find(r => r.id === selectedReportType)?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tarih Aralığı</p>
                  <p className="font-medium">
                    {dateRange.startDate || '(Belirtilmedi)'} - {dateRange.endDate || '(Belirtilmedi)'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Toplam Kayıt</p>
                  <p className="font-medium">{mockHealthData.length}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Oluşturma Tarihi</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Chart placeholder with better styling */}
            <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden shadow-sm">
              <div className="border-b px-4 py-3 bg-gray-50">
                <h3 className="font-medium text-gray-700">Ortalama Değerler Grafiği</h3>
              </div>
              <div className="p-4 flex items-center justify-center" style={{ height: "300px" }}>
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <p className="text-gray-500">Rapor verilerine göre grafik görselleştirmesi burada görüntülenecek</p>
                </div>
              </div>
            </div>
            
            {/* Data table with improved styling */}
            <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
              <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Detaylı Veri</h3>
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Ara..." 
                    className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-1 mr-2"
                  />
                  <select className="border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 py-1">
                    <option>Sırala</option>
                    <option>İsim (A-Z)</option>
                    <option>ID (A-Z)</option>
                    <option>Nabız (Yüksek-Düşük)</option>
                    <option>Sıcaklık (Yüksek-Düşük)</option>
                  </select>
                </div>
              </div>
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hayvan ID</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İsim</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nabız (ort.)</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vücut Sıcaklığı (ort.)</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktivite Seviyesi</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stres Seviyesi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockHealthData.map(animal => (
                    <tr key={animal.animalId} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        <span className="font-medium text-blue-600">{animal.tag}</span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{animal.name}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            animal.heartRate > 80 ? 'bg-red-500' : 
                            animal.heartRate > 70 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}></span>
                          {animal.heartRate} bpm
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            animal.temperature > 39 ? 'bg-red-500' : 
                            animal.temperature > 38.5 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}></span>
                          {animal.temperature}°C
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div className={`h-2.5 rounded-full ${
                              animal.activityLevel > 70 ? 'bg-green-500' : 
                              animal.activityLevel > 40 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`} style={{ width: `${animal.activityLevel}%` }}></div>
                          </div>
                          <span>{animal.activityLevel}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          animal.stressLevel === 'Düşük' ? 'bg-green-100 text-green-800' : 
                          animal.stressLevel === 'Orta' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {animal.stressLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination controls */}
              <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Toplam <span className="font-medium">{mockHealthData.length}</span> kayıt
                </div>
                <div className="flex">
                  <button className="px-3 py-1 border border-gray-300 rounded-md mr-2 text-sm bg-white hover:bg-gray-50">Önceki</button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">Sonraki</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Saved Reports (Optional) */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h2 className="text-lg font-semibold text-white">Kaydedilmiş Raporlar</h2>
            </div>
            {hasSavedReports && (
              <button className="text-white bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded-md text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtrele
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {hasSavedReports ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockSavedReports.map(report => (
                <div key={report.id} className="border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-all">
                  <div className={`px-4 py-3 border-b ${report.type === 'health' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        {report.name}
                      </h3>
                      <div className="flex items-center">
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="mb-2 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.type === 'health' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {mockReportTypes.find(rt => rt.id === report.type)?.name}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(report.createdAt).toLocaleDateString()} | {new Date(report.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {report.filterParams.startDate || '(Belirtilmedi)'} - {report.filterParams.endDate || '(Belirtilmedi)'}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-sm px-3 py-1 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Görüntüle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4">
              <div className="bg-indigo-50 mx-auto rounded-full p-3 h-16 w-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Henüz Kaydedilmiş Rapor Yok</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Bir rapor oluşturup kaydederek buradan erişebilirsiniz. Kaydedilen raporlar daha sonra tekrar görüntülenebilir veya indirilebilir.
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Yeni Rapor Oluştur
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 