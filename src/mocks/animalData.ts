// Mock veri fonksiyonu - gerçek API yerine kullanılacak
export const getMockAnimalData = (id: string) => {
    // Eğer belirli bir id için veri isteniyorsa
    if (id) {
        return {
            id,
            tagNumber: 'TR123456789',
            name: 'Sarıkız',
            species: 'İnek',
            breed: 'Holstein',
            age: 4,
            gender: 'Dişi',
            weight: 550,
            birthDate: '12.05.2020',
            acquisition: 'Doğumla edinildi',

            healthData: {
                pulseRate: {
                    current: 72,
                    history: [
                        { date: '01.10.2024', value: 70 },
                        { date: '02.10.2024', value: 72 },
                        { date: '03.10.2024', value: 71 },
                    ]
                },
                stressLevel: {
                    current: 3,
                    history: [
                        { date: '01.10.2024', value: 2 },
                        { date: '02.10.2024', value: 4 },
                        { date: '03.10.2024', value: 3 },
                    ]
                },
                bodyTemperature: {
                    current: 38.6,
                    history: [
                        { date: '01.10.2024', value: 38.5 },
                        { date: '02.10.2024', value: 38.7 },
                        { date: '03.10.2024', value: 38.6 },
                    ]
                },
                medications: [
                    {
                        name: 'Antibiyotik A',
                        date: '28.09.2024',
                        notes: 'Hafif enfeksiyon tedavisi',
                        effect: 'positive' as const
                    },
                    {
                        name: 'Vitamin B kompleksi',
                        date: '15.09.2024',
                        notes: 'Genel sağlık desteği',
                        effect: 'neutral' as const
                    }
                ]
            },

            behaviors: {
                sleepQuality: {
                    duration: 8,
                    periods: 5,
                    qualityScore: 7,
                    history: [
                        { date: '01.10.2024', value: 8 },
                        { date: '02.10.2024', value: 7 },
                        { date: '03.10.2024', value: 7 },
                    ]
                },
                restingStandingRatio: {
                    resting: 14,
                    standing: 10,
                    history: [
                        { date: '01.10.2024', value: 60 }, // Dinlenme yüzdesi
                        { date: '02.10.2024', value: 55 },
                        { date: '03.10.2024', value: 58 },
                    ]
                },
                ruminationCount: {
                    daily: 420,
                    hourly: [
                        { date: '03.10.2024 08:00', value: 25 },
                        { date: '03.10.2024 09:00', value: 22 },
                        { date: '03.10.2024 10:00', value: 18 },
                    ]
                },
                stepCount: {
                    daily: 2500,
                    history: [
                        { date: '01.10.2024', value: 2300 },
                        { date: '02.10.2024', value: 2450 },
                        { date: '03.10.2024', value: 2500 },
                    ]
                },
                feedingDuration: {
                    daily: 320, // dakika
                    frequency: 8,
                    cameraFootageUrl: 'https://example.com/footage/12345'
                }
            },

            reproduction: {
                heatCycles: [
                    {
                        date: '15.09.2024',
                        symptoms: ['Hareketlilik artışı', 'Östrus mukusu', 'Diğer inekleri aşma girişimi'],
                        certainty: 85
                    },
                    {
                        date: '25.08.2024',
                        symptoms: ['Hareketlilik artışı', 'İştah azalması'],
                        certainty: 65
                    }
                ],
                birthData: {
                    expectedDate: '15.06.2025',
                    symptoms: ['Meme gelişimi başladı'],
                    status: 'waiting' as const
                },
                maternalBehavior: {
                    interactionDuration: 180, // dakika/gün
                    behaviourNotes: ['Geçmiş doğumlarda iyi anne davranışları gösterdi', 'Yavruyu temizleme davranışı yüksek'],
                    cameraFootageUrl: 'https://example.com/footage/67890'
                }
            },

            locationSocial: {
                locationData: {
                    currentLocation: {
                        lat: 40.123456,
                        lng: 29.654321
                    },
                    historicalPath: [
                        { time: '03.10.2024 08:00', lat: 40.123450, lng: 29.654325 },
                        { time: '03.10.2024 10:00', lat: 40.123470, lng: 29.654310 },
                        { time: '03.10.2024 12:00', lat: 40.123456, lng: 29.654321 },
                    ],
                    abnormalLocationAlerts: [
                        {
                            date: '01.10.2024 14:20',
                            description: 'Çayır alanından uzaklaşma',
                            severity: 'low' as const
                        }
                    ]
                },
                socialData: {
                    herdInteractions: [
                        {
                            interaction: 'Yan yana otlama',
                            frequency: 12,
                            animalIds: ['TR123456788', 'TR123456787']
                        },
                        {
                            interaction: 'Sosyal tımar',
                            frequency: 5,
                            animalIds: ['TR123456788']
                        }
                    ],
                    closeFriends: [
                        {
                            animalId: 'TR123456788',
                            animalName: 'Benekli',
                            proximityScore: 85
                        },
                        {
                            animalId: 'TR123456787',
                            animalName: 'Karabaş',
                            proximityScore: 65
                        }
                    ]
                }
            },

            riskEnvironment: {
                riskData: {
                    drowningRisks: [
                        {
                            date: '30.09.2024 16:45',
                            location: 'Kuzey Gölet',
                            distance: 15,
                            severity: 'medium' as const
                        }
                    ]
                },
                environmentData: {
                    gasLevels: {
                        ammonia: 8, // ppm
                        methane: 450, // ppm
                        date: '03.10.2024 14:00',
                        history: [
                            { date: '01.10.2024', ammonia: 7, methane: 430 },
                            { date: '02.10.2024', ammonia: 9, methane: 460 },
                            { date: '03.10.2024', ammonia: 8, methane: 450 },
                        ]
                    }
                }
            }
        };
    }

    // ID belirtilmemişse null döndür
    return null;
}; 