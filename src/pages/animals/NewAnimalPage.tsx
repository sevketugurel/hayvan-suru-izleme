import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnimalStore } from '../../store';
import './NewAnimalPage.css';

const NewAnimalPage: React.FC = () => {
  const navigate = useNavigate();
  const { addAnimal, loading, error } = useAnimalStore();
  
  const [formData, setFormData] = useState({
    name: '',
    tagNumber: '',
    species: '',
    birthDate: '',
    gender: '',
    breed: '',
    weight: '',
    location: '',
    status: 'active' as 'active' | 'inactive' | 'warning',
    batteryLevel: '100',
    heartRate: '70',
    stressLevel: 'low' as 'low' | 'medium' | 'high',
    bodyTemperature: '38.5',
    heatCycle: 'inactive' as 'inactive' | 'active' | 'peak',
    herdDistance: '0'
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = 'Hayvan adı gereklidir';
    if (!formData.tagNumber.trim()) errors.tagNumber = 'Küpe numarası gereklidir';
    if (!formData.species.trim()) errors.species = 'Tür gereklidir';
    
    if (!formData.birthDate.trim()) errors.birthDate = 'Doğum tarihi gereklidir';
    
    if (!formData.location.trim()) errors.location = 'Konum gereklidir';
    
    const weight = parseFloat(formData.weight);
    if (formData.weight && (isNaN(weight) || weight <= 0)) {
      errors.weight = 'Geçerli bir ağırlık giriniz';
    }
    
    const batteryLevel = parseInt(formData.batteryLevel);
    if (isNaN(batteryLevel) || batteryLevel < 0 || batteryLevel > 100) {
      errors.batteryLevel = 'Pil seviyesi 0-100 arasında olmalıdır';
    }
    
    const heartRate = parseInt(formData.heartRate);
    if (isNaN(heartRate) || heartRate <= 0) {
      errors.heartRate = 'Geçerli bir nabız değeri giriniz';
    }
    
    const bodyTemp = parseFloat(formData.bodyTemperature);
    if (isNaN(bodyTemp) || bodyTemp < 35 || bodyTemp > 42) {
      errors.bodyTemperature = 'Vücut sıcaklığı 35-42°C arasında olmalıdır';
    }
    
    const herdDistance = parseInt(formData.herdDistance);
    if (isNaN(herdDistance) || herdDistance < 0) {
      errors.herdDistance = 'Sürü uzaklığı pozitif bir değer olmalıdır';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Calculate age from birthDate
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    const animalData = {
      name: formData.name,
      tagNumber: formData.tagNumber,
      species: formData.species,
      age: age,
      gender: formData.gender,
      breed: formData.breed,
      weight: formData.weight ? parseFloat(formData.weight) : 0,
      location: formData.location,
      status: formData.status,
      batteryLevel: parseInt(formData.batteryLevel),
      heartRate: parseInt(formData.heartRate),
      stressLevel: formData.stressLevel,
      bodyTemperature: parseFloat(formData.bodyTemperature),
      heatCycle: formData.heatCycle,
      herdDistance: parseInt(formData.herdDistance)
    };
    
    await addAnimal(animalData);
    if (!error) {
      navigate('/animals');
    }
  };
  
  return (
    <div className="new-animal-page">
      <div className="page-header">
        <h1>Yeni Hayvan Ekle</h1>
        <Link to="/animals" className="back-button">
          Hayvan Listesine Dön
        </Link>
      </div>

      <div className="animal-form-container">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="animal-form">
          <div className="form-section">
            <h2>Temel Bilgiler</h2>
            
            <div className="form-group">
              <label htmlFor="name">Hayvan Adı:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && <span className="error-text">{formErrors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="tagNumber">Küpe Numarası:</label>
              <input
                type="text"
                id="tagNumber"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
                placeholder="TR12345678XX"
                className={formErrors.tagNumber ? 'error' : ''}
              />
              {formErrors.tagNumber && <span className="error-text">{formErrors.tagNumber}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="species">Tür:</label>
              <input
                type="text"
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                placeholder="İnek, Koyun, Keçi, vb."
                className={formErrors.species ? 'error' : ''}
              />
              {formErrors.species && <span className="error-text">{formErrors.species}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="breed">Irk:</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                className={formErrors.breed ? 'error' : ''}
              />
              {formErrors.breed && <span className="error-text">{formErrors.breed}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Cinsiyet:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={formErrors.gender ? 'error' : ''}
              >
                <option value="">Seçiniz</option>
                <option value="male">Erkek</option>
                <option value="female">Dişi</option>
              </select>
              {formErrors.gender && <span className="error-text">{formErrors.gender}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="birthDate">Doğum Tarihi:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={formErrors.birthDate ? 'error' : ''}
              />
              {formErrors.birthDate && <span className="error-text">{formErrors.birthDate}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="weight">Ağırlık (kg):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                className={formErrors.weight ? 'error' : ''}
              />
              {formErrors.weight && <span className="error-text">{formErrors.weight}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Konum:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Kuzey Otlak, Güney Otlak, vb."
                className={formErrors.location ? 'error' : ''}
              />
              {formErrors.location && <span className="error-text">{formErrors.location}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Durum:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Aktif</option>
                <option value="inactive">İnaktif</option>
                <option value="warning">Uyarı</option>
              </select>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Sağlık ve İzleme Verileri</h2>
            
            <div className="form-group">
              <label htmlFor="batteryLevel">Pil Seviyesi (%):</label>
              <input
                type="number"
                id="batteryLevel"
                name="batteryLevel"
                value={formData.batteryLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className={formErrors.batteryLevel ? 'error' : ''}
              />
              {formErrors.batteryLevel && <span className="error-text">{formErrors.batteryLevel}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="heartRate">Nabız (bpm):</label>
              <input
                type="number"
                id="heartRate"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                className={formErrors.heartRate ? 'error' : ''}
              />
              {formErrors.heartRate && <span className="error-text">{formErrors.heartRate}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="stressLevel">Stres Seviyesi:</label>
              <select
                id="stressLevel"
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleChange}
              >
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="bodyTemperature">Vücut Sıcaklığı (°C):</label>
              <input
                type="number"
                id="bodyTemperature"
                name="bodyTemperature"
                value={formData.bodyTemperature}
                onChange={handleChange}
                step="0.1"
                className={formErrors.bodyTemperature ? 'error' : ''}
              />
              {formErrors.bodyTemperature && <span className="error-text">{formErrors.bodyTemperature}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="heatCycle">Isı Döngüsü:</label>
              <select
                id="heatCycle"
                name="heatCycle"
                value={formData.heatCycle}
                onChange={handleChange}
              >
                <option value="inactive">İnaktif</option>
                <option value="active">Aktif</option>
                <option value="peak">Doruk</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="herdDistance">Sürü Uzaklığı (m):</label>
              <input
                type="number"
                id="herdDistance"
                name="herdDistance"
                value={formData.herdDistance}
                onChange={handleChange}
                min="0"
                className={formErrors.herdDistance ? 'error' : ''}
              />
              {formErrors.herdDistance && <span className="error-text">{formErrors.herdDistance}</span>}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Ekleniyor...' : 'Hayvanı Ekle'}
            </button>
            <Link to="/animals" className="cancel-button">
              İptal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAnimalPage; 