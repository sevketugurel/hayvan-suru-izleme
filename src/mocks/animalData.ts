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

            treatments: {
                pastTreatments: [
                    {
                        id: 'PT001',
                        date: '15.08.2024',
                        diagnosis: 'Mastitis',
                        treatment: 'Antibiyotik tedavisi ve meme masajı',
                        medications: [
                            { name: 'Spectramast LC', dosage: '10ml', method: 'Intramamary enjeksiyon' },
                            { name: 'Banamine', dosage: '5ml/100kg', method: 'IM enjeksiyon' }
                        ],
                        veterinarian: 'Dr. Mehmet Yılmaz',
                        result: 'Tamamen İyileşti',
                        notes: 'Tedavi sonrası süt verimi normale döndü'
                    },
                    {
                        id: 'PT002',
                        date: '05.06.2024',
                        diagnosis: 'Topalık',
                        treatment: 'Tırnak kesim ve bandaj',
                        medications: [
                            { name: 'Hoofgel', dosage: '50gr', method: 'Topikal uygulama' }
                        ],
                        veterinarian: 'Dr. Ayşe Demir',
                        result: 'İyileşti, izleniyor',
                        notes: 'Beyaz çizgi hastalığı şüphesi'
                    },
                    {
                        id: 'PT003',
                        date: '22.03.2024',
                        diagnosis: 'Parazit enfestasyonu',
                        treatment: 'Anti-paraziter uygulama',
                        medications: [
                            { name: 'Ivermectin', dosage: '1ml/50kg', method: 'SC enjeksiyon' }
                        ],
                        veterinarian: 'Dr. Ali Can',
                        result: 'Tamamen İyileşti',
                        notes: 'Rutin parazit kontrolü'
                    }
                ],
                activeTreatments: [
                    {
                        id: 'AT001',
                        startDate: '01.10.2024',
                        estimatedEndDate: '08.10.2024',
                        diagnosis: 'Hafif solunum yolu enfeksiyonu',
                        treatmentPlan: 'Antibiyotik tedavisi ve destek bakım',
                        medicationSchedule: [
                            {
                                medication: 'Draxxin',
                                dosage: '2.5ml/100kg',
                                frequency: 'Tek doz',
                                method: 'SC enjeksiyon',
                                remainingDays: 0
                            },
                            {
                                medication: 'Meloksikam',
                                dosage: '5ml',
                                frequency: 'Günde bir kez',
                                method: 'SC enjeksiyon',
                                remainingDays: 2
                            },
                            {
                                medication: 'Vitamin C',
                                dosage: '10ml',
                                frequency: 'Günde bir kez',
                                method: 'Oral',
                                remainingDays: 5
                            }
                        ],
                        progress: 65,
                        notes: 'Solunum hızı normale dönüyor, iştah iyi'
                    }
                ],
                vaccinations: [
                    {
                        id: 'VAX001',
                        name: 'Şap (FMD)',
                        date: '15.01.2024',
                        status: 'completed',
                        validUntil: '15.01.2025',
                        veterinarian: 'Dr. Mehmet Yılmaz'
                    },
                    {
                        id: 'VAX002',
                        name: 'Brucella',
                        date: '15.01.2024',
                        status: 'completed',
                        validUntil: '15.01.2026',
                        veterinarian: 'Dr. Mehmet Yılmaz'
                    },
                    {
                        id: 'VAX003',
                        name: 'Clostridial',
                        date: '20.10.2024',
                        status: 'scheduled',
                        veterinarian: 'Dr. Ayşe Demir'
                    },
                    {
                        id: 'VAX004',
                        name: 'IBR/BVD',
                        date: '01.09.2024',
                        status: 'overdue',
                        veterinarian: 'Dr. Ali Can'
                    }
                ],
                diseaseHistory: [
                    {
                        id: 'DH001',
                        diseaseName: 'Mastitis',
                        diagnosisDate: '13.08.2024',
                        recoveryDate: '20.08.2024',
                        duration: 7,
                        severity: 'medium',
                        treatment: 'Antibiyotik tedavisi ve meme masajı',
                        recurrenceRisk: 35,
                        notes: 'Sol ön meme lobunda sorun vardı'
                    },
                    {
                        id: 'DH002',
                        diseaseName: 'Topalık (Laminitis)',
                        diagnosisDate: '01.06.2024',
                        recoveryDate: '20.06.2024',
                        duration: 19,
                        severity: 'low',
                        treatment: 'Tırnak kesim ve bandaj',
                        recurrenceRisk: 25,
                        notes: 'Sağ arka ayak'
                    },
                    {
                        id: 'DH003',
                        diseaseName: 'Parazit enfestasyonu',
                        diagnosisDate: '20.03.2024',
                        recoveryDate: '30.03.2024',
                        duration: 10,
                        severity: 'low',
                        treatment: 'Anti-paraziter uygulama',
                        recurrenceRisk: 15
                    }
                ],
                medicationUsage: [
                    {
                        medicationName: 'Antibiyotikler',
                        totalUsage: 350,
                        unit: 'ml',
                        administrationMethods: ['IM enjeksiyon', 'SC enjeksiyon', 'Intramamary'],
                        lastUsed: '01.10.2024',
                        effectivenessScore: 85
                    },
                    {
                        medicationName: 'Anti-inflamatuarlar',
                        totalUsage: 120,
                        unit: 'ml',
                        administrationMethods: ['IM enjeksiyon', 'IV enjeksiyon'],
                        lastUsed: '02.10.2024',
                        effectivenessScore: 90
                    },
                    {
                        medicationName: 'Vitamin kompleksleri',
                        totalUsage: 2,
                        unit: 'kg',
                        administrationMethods: ['Oral', 'Yem katkısı'],
                        lastUsed: '25.09.2024',
                        effectivenessScore: 70
                    },
                    {
                        medicationName: 'Parazit ilaçları',
                        totalUsage: 75,
                        unit: 'ml',
                        administrationMethods: ['SC enjeksiyon', 'Pour-on'],
                        lastUsed: '22.03.2024',
                        effectivenessScore: 95
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