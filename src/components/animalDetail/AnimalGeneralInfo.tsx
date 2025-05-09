import React from 'react';

interface AnimalGeneralInfoProps {
    id: string;
    tagNumber: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    gender: string;
    weight: number;
    birthDate: string;
    acquisition: string;
}

const AnimalGeneralInfo: React.FC<AnimalGeneralInfoProps> = ({
    id,
    tagNumber,
    name,
    species,
    breed,
    age,
    gender,
    weight,
    birthDate,
    acquisition
}) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Genel Bilgiler</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Kimlik</p>
                    <p className="font-medium">{id}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Küpe Numarası</p>
                    <p className="font-medium">{tagNumber}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">İsim</p>
                    <p className="font-medium">{name}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Tür</p>
                    <p className="font-medium">{species}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Irk</p>
                    <p className="font-medium">{breed}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Yaş</p>
                    <p className="font-medium">{age} yıl</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Cinsiyet</p>
                    <p className="font-medium">{gender}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Ağırlık</p>
                    <p className="font-medium">{weight} kg</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Doğum Tarihi</p>
                    <p className="font-medium">{birthDate}</p>
                </div>

                <div className="space-y-1">
                    <p className="text-gray-500 text-sm">Edinim</p>
                    <p className="font-medium">{acquisition}</p>
                </div>
            </div>
        </div>
    );
};

export default AnimalGeneralInfo; 