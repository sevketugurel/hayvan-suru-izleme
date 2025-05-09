import React from 'react';
import { useParams } from 'react-router-dom';
import { AnimalDetailTabs } from '../../components/animalDetail';
import { getMockAnimalData } from '../../mocks/animalData';

const AnimalDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Gerçek bir API çağrısı yerine şimdilik mock veri kullanıyoruz
    const animalData = getMockAnimalData(id || '');

    if (!animalData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Hayvan Bulunamadı</h1>
                    <p className="text-gray-600">
                        ID: {id} ile bir hayvan kaydı bulunamadı. Lütfen doğru bir hayvan ID'si girdiğinizden emin olun.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-md">
                <AnimalDetailTabs animalId={id || ''} animalData={animalData} />
            </div>
        </div>
    );
};

export default AnimalDetailPage; 