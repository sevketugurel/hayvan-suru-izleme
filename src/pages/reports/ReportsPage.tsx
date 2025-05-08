import React from 'react';

const ReportsPage: React.FC = () => {
  return (
    <div className="reports-page">
      <h1>Raporlar</h1>
      
      <div className="report-filters">
        <div className="filter-group">
          <label>Rapor Türü:</label>
          <select>
            <option>Hareket Raporu</option>
            <option>Uyarı Özeti</option>
            <option>Pil Durum Raporu</option>
            <option>Aktivite Raporu</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Tarih Aralığı:</label>
          <input type="date" placeholder="Başlangıç" />
          <input type="date" placeholder="Bitiş" />
        </div>
        
        <div className="filter-group">
          <label>Hayvan:</label>
          <select>
            <option value="">Tümü</option>
            <option value="A001">Kurt - #A001</option>
            <option value="A002">Kartal - #A002</option>
            <option value="A003">Ayı - #A003</option>
            <option value="A004">Geyik - #A004</option>
            <option value="A005">Tilki - #A005</option>
          </select>
        </div>
        
        <button className="generate-btn">Rapor Oluştur</button>
      </div>
      
      <div className="report-placeholder">
        <div className="report-section">
          <h2>Hareket Raporu</h2>
          <div className="chart-placeholder">
            <p>Grafik burada gösterilecek</p>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>Hayvan ID</th>
                <th>İsim</th>
                <th>Konum</th>
                <th>Mesafe</th>
                <th>Hareket Zamanı</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A001</td>
                <td>Kurt</td>
                <td>Kuzey Ormanı</td>
                <td>5.2 km</td>
                <td>14:30, 15 Ağustos 2023</td>
              </tr>
              <tr>
                <td>A003</td>
                <td>Ayı</td>
                <td>Batı Ormanı</td>
                <td>3.7 km</td>
                <td>08:20, 15 Ağustos 2023</td>
              </tr>
              <tr>
                <td>A005</td>
                <td>Tilki</td>
                <td>Orta Ova</td>
                <td>2.1 km</td>
                <td>11:50, 15 Ağustos 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="export-options">
        <button>PDF İndir</button>
        <button>Excel İndir</button>
        <button>Yazdır</button>
      </div>
    </div>
  );
};

export default ReportsPage; 