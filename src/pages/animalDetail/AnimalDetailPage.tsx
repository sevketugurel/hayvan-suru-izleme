import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimalDetailTabs } from '../../components/animalDetail';
import { getMockAnimalData } from '../../mocks/animalData';
import { animals } from '../../mocks/animals';

const AnimalDetailPage: React.FC = () => {
    const { animalId } = useParams<{ animalId: string }>();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [animalBasicInfo, setAnimalBasicInfo] = useState<any>(null);
    const [animalData, setAnimalData] = useState<any>(null);

    useEffect(() => {
        // Simulate loading data
        setLoading(true);
        
        // Find basic animal info from the animal list
        const basicInfo = animals.find(animal => animal.id === animalId);
        setAnimalBasicInfo(basicInfo || null);
        
        // Get detailed data
        const detailedData = getMockAnimalData(animalId || '');
        setAnimalData(detailedData || null);
        
        if (!basicInfo || !detailedData) {
            setNotFound(true);
        }
        
        setLoading(false);
    }, [animalId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Yükleniyor...</h1>
                    <p className="text-gray-600">Hayvan verileri getiriliyor.</p>
                </div>
            </div>
        );
    }

    if (notFound || !animalData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Hayvan Bulunamadı</h1>
                    <p className="text-gray-600">
                        ID: {animalId} ile bir hayvan kaydı bulunamadı. Lütfen doğru bir hayvan ID'si girdiğinizden emin olun.
                    </p>
                    <Link to="/animals" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Hayvan Listesine Dön
                    </Link>
                </div>
            </div>
        );
    }

    // Use basicInfo if available (from animals list) or fallback to animalData values
    const animalName = animalBasicInfo?.name || animalData.name;
    const animalSpecies = animalBasicInfo?.species || animalData.species;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-4">
                <Link to="/animals" className="text-blue-500 hover:underline flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Hayvan Listesine Dön
                </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md">
                <AnimalDetailTabs animalId={animalId || ''} animalData={animalData} />
            </div>
        </div>
    );
};

export default AnimalDetailPage; 