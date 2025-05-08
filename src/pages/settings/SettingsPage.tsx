import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="settings-page max-w-7xl mx-auto">
      <h1>Ayarlar</h1>
      
      <div className="settings-container">
        <div className="settings-section">
          <h2>Profil Ayarları</h2>
          <form>
            <div className="form-group">
              <label>Kullanıcı Adı</label>
              <input type="text" defaultValue="admin" />
            </div>
            <div className="form-group">
              <label>E-posta</label>
              <input type="email" defaultValue="admin@example.com" />
            </div>
            <div className="form-group">
              <label>Şifre</label>
              <input type="password" defaultValue="********" />
            </div>
            <button type="submit">Kaydet</button>
          </form>
        </div>
        
        <div className="settings-section">
          <h2>Sistem Ayarları</h2>
          <form>
            <div className="form-group">
              <label>Dil</label>
              <select defaultValue="tr">
                <option value="tr">Türkçe</option>
                <option value="en">İngilizce</option>
              </select>
            </div>
            <div className="form-group">
              <label>Bildirimler</label>
              <div className="checkbox-group">
                <div>
                  <input type="checkbox" id="email-notifications" defaultChecked />
                  <label htmlFor="email-notifications">E-posta Bildirimleri</label>
                </div>
                <div>
                  <input type="checkbox" id="push-notifications" defaultChecked />
                  <label htmlFor="push-notifications">Anlık Bildirimler</label>
                </div>
                <div>
                  <input type="checkbox" id="sms-notifications" />
                  <label htmlFor="sms-notifications">SMS Bildirimleri</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Konum Güncelleme Sıklığı</label>
              <select defaultValue="15">
                <option value="5">5 dakika</option>
                <option value="15">15 dakika</option>
                <option value="30">30 dakika</option>
                <option value="60">1 saat</option>
              </select>
            </div>
            <button type="submit">Kaydet</button>
          </form>
        </div>
        
        <div className="settings-section">
          <h2>İzleme Bölgesi</h2>
          <div className="map-placeholder">
            <p>Harita burada gösterilecek</p>
          </div>
          <div className="form-group">
            <label>İzleme Yarıçapı (km)</label>
            <input type="range" min="1" max="50" defaultValue="20" />
            <span>20 km</span>
          </div>
          <button>Bölgeyi Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 