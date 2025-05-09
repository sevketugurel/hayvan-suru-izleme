export const animalDetailMocks = {
    // Konum ve Sosyal Davranışlar için genişletilmiş mock veriler
    locationSocial: {
        gpsTracking: {
            currentPosition: {
                latitude: 40.123456,
                longitude: 29.654321,
                timestamp: '2024-10-04T12:30:45Z',
                accuracy: 3.5 // metre cinsinden
            },
            dailyMovement: [
                { timestamp: '2024-10-04T06:00:00Z', latitude: 40.123450, longitude: 29.654325 },
                { timestamp: '2024-10-04T08:00:00Z', latitude: 40.123460, longitude: 29.654315 },
                { timestamp: '2024-10-04T10:00:00Z', latitude: 40.123470, longitude: 29.654310 },
                { timestamp: '2024-10-04T12:00:00Z', latitude: 40.123456, longitude: 29.654321 }
            ],
            pastLocations: [
                {
                    date: '2024-10-03',
                    positions: [
                        { timestamp: '2024-10-03T06:00:00Z', latitude: 40.123445, longitude: 29.654318 },
                        { timestamp: '2024-10-03T12:00:00Z', latitude: 40.123455, longitude: 29.654322 },
                        { timestamp: '2024-10-03T18:00:00Z', latitude: 40.123458, longitude: 29.654328 }
                    ]
                },
                {
                    date: '2024-10-02',
                    positions: [
                        { timestamp: '2024-10-02T06:00:00Z', latitude: 40.123440, longitude: 29.654310 },
                        { timestamp: '2024-10-02T12:00:00Z', latitude: 40.123450, longitude: 29.654320 },
                        { timestamp: '2024-10-02T18:00:00Z', latitude: 40.123460, longitude: 29.654330 }
                    ]
                }
            ]
        },
        herdDeviation: {
            isDeviated: false,
            deviationHistory: [
                {
                    date: '2024-10-01',
                    time: '14:20',
                    description: 'Çayır alanından uzaklaşma',
                    severity: 'low',
                    duration: 45, // dakika
                    distance: 150, // metre
                    action: 'Personel kontrol etti, hayvan sürüye geri döndü'
                },
                {
                    date: '2024-09-15',
                    time: '11:05',
                    description: 'Sürüden ayrılma',
                    severity: 'medium',
                    duration: 120, // dakika
                    distance: 300, // metre
                    action: 'Hayvan sürüye yönlendirildi'
                }
            ],
            safeZones: [
                {
                    name: 'Ana Mera',
                    center: { latitude: 40.123450, longitude: 29.654320 },
                    radius: 500 // metre
                },
                {
                    name: 'Kuzey Otlak',
                    center: { latitude: 40.125450, longitude: 29.654320 },
                    radius: 300 // metre
                }
            ],
            alertSettings: {
                maxDistance: 400, // metre
                alertThreshold: 15 // dakika
            }
        },
        socialBehavior: {
            summary: 'Sürü içinde genellikle uyumlu, sosyal etkileşimleri yüksek, lider özelliği gösteren bir hayvan. Diğer hayvanlarla çok iyi anlaşıyor ve sıklıkla sosyal tımar davranışı sergiliyor.',
            socialScore: 85, // 0-100 arası puan
            dominanceRank: 3, // sürü içindeki hiyerarşi sırası
            interactions: [
                {
                    type: 'Sosyal Tımar',
                    frequency: 12, // günlük ortalama
                    partners: ['TR123456788', 'TR123456787'],
                    duration: 25 // dakika/gün
                },
                {
                    type: 'Yan Yana Otlama',
                    frequency: 8,
                    partners: ['TR123456788', 'TR123456787', 'TR123456790'],
                    duration: 180 // dakika/gün
                },
                {
                    type: 'Oyun',
                    frequency: 2,
                    partners: ['TR123456788'],
                    duration: 15 // dakika/gün
                }
            ],
            abnormalBehaviors: [] // Anormal davranış yok
        },
        closeFriends: {
            bestFriends: [
                {
                    animalId: 'TR123456788',
                    animalName: 'Benekli',
                    proximityScore: 92, // 0-100 arası yakınlık puanı
                    dailyInteractionTime: 215, // dakika
                    relationshipDuration: 14 // ay
                },
                {
                    animalId: 'TR123456787',
                    animalName: 'Karabaş',
                    proximityScore: 78,
                    dailyInteractionTime: 180,
                    relationshipDuration: 12
                }
            ],
            recentChanges: 'Son 2 ay içerisinde Benekli ile yakınlık artışı gözlendi.',
            socialNetworkVisualization: '/images/network/TR123456789_social.png' // Daha sonra eklenebilir
        }
    },

    // Riskler ve Çevre için genişletilmiş mock veriler
    riskEnvironment: {
        drowningRisk: {
            currentRisk: 'low', // low, medium, high
            riskHistory: [
                {
                    date: '2024-09-30',
                    time: '16:45',
                    location: 'Kuzey Gölet',
                    distance: 15, // metre
                    severity: 'medium',
                    duration: 10, // dakika
                    weatherConditions: 'Yağmurlu'
                },
                {
                    date: '2024-09-10',
                    time: '12:30',
                    location: 'Doğu Dere',
                    distance: 5,
                    severity: 'high',
                    duration: 25,
                    weatherConditions: 'Açık'
                }
            ],
            dangerZones: [
                {
                    name: 'Kuzey Gölet',
                    type: 'Su Birikintisi',
                    center: { latitude: 40.124560, longitude: 29.654321 },
                    radius: 50, // metre
                    depth: 2.5, // metre
                    safeDistance: 20 // metre
                },
                {
                    name: 'Doğu Dere',
                    type: 'Akarsu',
                    coordinates: [
                        { latitude: 40.123500, longitude: 29.656321 },
                        { latitude: 40.123600, longitude: 29.656421 },
                        { latitude: 40.123700, longitude: 29.656521 }
                    ],
                    depth: 1.2,
                    width: 3.5,
                    flowRate: 'Orta', // Düşük, Orta, Yüksek
                    safeDistance: 15
                }
            ],
            preventiveMeasures: [
                'Tehlikeli bölge çevresinde çit yapısı',
                'GPS takibi ile uyarı sistemi',
                'Düzenli personel kontrolü'
            ]
        },
        gasLevels: {
            animalSpecific: {
                lastReading: {
                    timestamp: '2024-10-04T10:00:00Z',
                    location: 'Ahır - Bölge 2',
                    ammonia: 8, // ppm
                    methane: 450, // ppm
                    carbonDioxide: 850, // ppm
                    humidity: 65, // %
                    temperature: 22 // °C
                },
                dailyAverage: {
                    date: '2024-10-04',
                    ammonia: 7.5,
                    methane: 430,
                    carbonDioxide: 820
                },
                weeklyTrend: {
                    startDate: '2024-09-28',
                    endDate: '2024-10-04',
                    ammoniaTrend: 'stable', // increasing, decreasing, stable
                    methaneTrend: 'increasing',
                    carbonDioxideTrend: 'stable'
                }
            },
            facilityLevels: {
                readings: [
                    {
                        location: 'Ahır - Bölge 1',
                        timestamp: '2024-10-04T10:00:00Z',
                        ammonia: 9,
                        methane: 470,
                        carbonDioxide: 900
                    },
                    {
                        location: 'Ahır - Bölge 2',
                        timestamp: '2024-10-04T10:00:00Z',
                        ammonia: 8,
                        methane: 450,
                        carbonDioxide: 850
                    },
                    {
                        location: 'Ahır - Bölge 3',
                        timestamp: '2024-10-04T10:00:00Z',
                        ammonia: 7,
                        methane: 420,
                        carbonDioxide: 800
                    }
                ],
                safetyThresholds: {
                    ammonia: { warning: 15, danger: 25 }, // ppm
                    methane: { warning: 500, danger: 1000 }, // ppm
                    carbonDioxide: { warning: 1500, danger: 3000 } // ppm
                },
                ventilationStatus: 'Normal', // Normal, Artırıldı, Acil
                airQualityIndex: 85 // 0-100 arası (100 en iyi)
            },
            historicalData: [
                { date: '2024-10-03', ammonia: 7, methane: 430, carbonDioxide: 810 },
                { date: '2024-10-02', ammonia: 9, methane: 460, carbonDioxide: 880 },
                { date: '2024-10-01', ammonia: 8, methane: 450, carbonDioxide: 850 },
                { date: '2024-09-30', ammonia: 7, methane: 420, carbonDioxide: 830 },
                { date: '2024-09-29', ammonia: 6, methane: 410, carbonDioxide: 820 }
            ]
        },
        otherRisks: {
            heatStress: {
                currentLevel: 'low', // low, medium, high
                temperatureHumidityIndex: 68, // THI değeri
                recommendedActions: []
            },
            predatorRisk: {
                level: 'low',
                recentSightings: [],
                vulnerabilityScore: 15 // 0-100 arası
            }
        }
    },

    // Tedaviler için genişletilmiş mock veriler
    treatments: {
        activeTreatments: [
            {
                id: 'AT001',
                startDate: '2024-10-01',
                estimatedEndDate: '2024-10-08',
                diagnosis: 'Hafif solunum yolu enfeksiyonu',
                diagnosisNotes: 'Solunum hızı artmış, hafif burun akıntısı mevcut. Ateş yok.',
                symptoms: ['Solunum hızında artış', 'Hafif burun akıntısı', 'İştahta azalma'],
                treatmentPlan: 'Antibiyotik tedavisi ve destek bakım',
                responsibleVet: 'Dr. Mehmet Yılmaz',
                medicationSchedule: [
                    {
                        medication: 'Draxxin',
                        activeIngredient: 'Tulathromycin',
                        dosage: '2.5ml/100kg',
                        frequency: 'Tek doz',
                        method: 'SC enjeksiyon',
                        remainingDoses: 0,
                        remainingDays: 0,
                        administeredBy: 'Dr. Mehmet Yılmaz',
                        administrationDate: '2024-10-01'
                    },
                    {
                        medication: 'Meloksikam',
                        activeIngredient: 'Meloxicam',
                        dosage: '5ml',
                        frequency: 'Günde bir kez',
                        method: 'SC enjeksiyon',
                        remainingDoses: 2,
                        remainingDays: 2,
                        administeredBy: 'Dr. Ayşe Demir, Bakıcı Ahmet',
                        administrationDates: ['2024-10-01', '2024-10-02', '2024-10-03']
                    },
                    {
                        medication: 'Vitamin C',
                        activeIngredient: 'Ascorbic Acid',
                        dosage: '10ml',
                        frequency: 'Günde bir kez',
                        method: 'Oral',
                        remainingDoses: 5,
                        remainingDays: 5,
                        administeredBy: 'Bakıcı Ahmet',
                        administrationDates: ['2024-10-01', '2024-10-02', '2024-10-03']
                    }
                ],
                progress: 65, // 0-100 arası yüzdelik değer
                progressNotes: [
                    { date: '2024-10-02', note: 'Solunum hızı düşmeye başladı, burun akıntısı hafif devam ediyor.' },
                    { date: '2024-10-03', note: 'İştah normale döndü, solunum hızı düştü.' },
                    { date: '2024-10-04', note: 'Solunum hızı normale döndü, burun akıntısı kesildi.' }
                ],
                followUpDate: '2024-10-09',
                notes: 'Solunum hızı normale dönüyor, iştah iyi'
            }
        ],

        pastTreatments: [
            {
                id: 'PT001',
                date: '2024-08-15',
                endDate: '2024-08-22',
                diagnosis: 'Mastitis',
                diagnosisNotes: 'Sol ön meme lobunda kızarıklık, sıcaklık ve sertlik. Sütte pıhtılar mevcut.',
                symptoms: ['Memede kızarıklık', 'Sütte pıhtılaşma', 'Süt veriminde düşüş', 'Hafif ateş'],
                diagnosticTests: [
                    { name: 'California Mastitis Test', result: 'Pozitif', date: '2024-08-15' },
                    { name: 'Süt Kültürü', result: 'Staphylococcus aureus', date: '2024-08-16' }
                ],
                treatment: 'Antibiyotik tedavisi ve meme masajı',
                medications: [
                    {
                        name: 'Spectramast LC',
                        activeIngredient: 'Ceftiofur hydrochloride',
                        dosage: '10ml',
                        method: 'Intramamary enjeksiyon',
                        frequency: 'Günde 1 kez, 5 gün',
                        administeredBy: 'Dr. Mehmet Yılmaz, Bakıcı Fatma'
                    },
                    {
                        name: 'Banamine',
                        activeIngredient: 'Flunixin meglumine',
                        dosage: '5ml/100kg',
                        method: 'IM enjeksiyon',
                        frequency: 'Günde 1 kez, 3 gün',
                        administeredBy: 'Dr. Mehmet Yılmaz'
                    }
                ],
                supportiveCare: [
                    'Etkilenen meme lobuna günde 3 kez masaj',
                    'Etkilenen lob düzenli olarak tamamen sağıldı',
                    'İlave su desteği'
                ],
                veterinarian: 'Dr. Mehmet Yılmaz',
                result: 'Tamamen İyileşti',
                resultDetail: 'Etkilenen meme lobu normal görünüme ve fonksiyona döndü, süt kalitesi normale döndü.',
                milkWithdrawalPeriod: {
                    startDate: '2024-08-15',
                    endDate: '2024-08-30',
                    completed: true
                },
                followUpExams: [
                    { date: '2024-08-23', finding: 'Şişlik ve kızarıklık tamamen geçmiş, süt normal görünümde' },
                    { date: '2024-09-15', finding: 'Kontrol muayenesinde normal, süt verimi tam kapasite' }
                ],
                notes: 'Tedavi sonrası süt verimi normale döndü'
            },
            {
                id: 'PT002',
                date: '2024-06-05',
                endDate: '2024-06-20',
                diagnosis: 'Topalık (Beyaz Çizgi Hastalığı)',
                diagnosisNotes: 'Sağ arka ayak tırnak duvarında beyaz çizgi hastalığı, orta şiddette.',
                symptoms: ['Sağ arka ayakta topalık', 'Ayak tabanında hassasiyet', 'Hareketlerde azalma'],
                diagnosticTests: [
                    { name: 'Ayak Muayenesi', result: 'Beyaz çizgi hastalığı', date: '2024-06-05' }
                ],
                treatment: 'Tırnak kesim ve bandaj',
                medications: [
                    {
                        name: 'Hoofgel',
                        activeIngredient: 'Copper sulfate, zinc sulfate',
                        dosage: '50gr',
                        method: 'Topikal uygulama',
                        frequency: 'Bandaj değişiminde uygulama',
                        administeredBy: 'Dr. Ayşe Demir'
                    }
                ],
                supportiveCare: [
                    'Düzenli bandaj değişimi (3 günde bir)',
                    'Kuru ve temiz zemin sağlandı',
                    'Kısa mesafe yürüyüşleri kısıtlandı'
                ],
                veterinarian: 'Dr. Ayşe Demir',
                result: 'İyileşti, izleniyor',
                resultDetail: 'Topalık kayboldu, tırnak normal görünüme döndü, tedavi sonrası düzenli bakım önerildi.',
                followUpExams: [
                    { date: '2024-06-20', finding: 'Tırnak yapısı iyileşmiş, normal basış mevcut' },
                    { date: '2024-07-15', finding: 'Kontrol muayenesinde normal' }
                ],
                notes: 'Beyaz çizgi hastalığı şüphesi',
                preventiveMeasures: 'Düzenli tırnak bakımı (3 ayda bir) önerildi, ayak banyosu uygulaması başlatıldı'
            },
            {
                id: 'PT003',
                date: '2024-03-22',
                endDate: '2024-03-30',
                diagnosis: 'Parazit enfestasyonu',
                diagnosisNotes: 'Dışkı muayenesinde internal parazitler tespit edildi. Tüy kalitesinde azalma.',
                symptoms: ['Tüy kalitesinde bozulma', 'Kilo kaybı', 'Hafif ishal'],
                diagnosticTests: [
                    { name: 'Dışkı Muayenesi', result: 'Pozitif (Ostertagia spp., Cooperia spp.)', date: '2024-03-21' }
                ],
                treatment: 'Anti-paraziter uygulama',
                medications: [
                    {
                        name: 'Ivermectin',
                        activeIngredient: 'Ivermectin',
                        dosage: '1ml/50kg',
                        method: 'SC enjeksiyon',
                        frequency: 'Tek doz',
                        administeredBy: 'Dr. Ali Can'
                    }
                ],
                supportiveCare: [
                    'Vitamin takviyesi (oral)',
                    'Protein içeriği yüksek diyet'
                ],
                veterinarian: 'Dr. Ali Can',
                result: 'Tamamen İyileşti',
                resultDetail: 'Tüm semptomlar 7-10 gün içinde ortadan kalktı, tüy yapısı düzeldi.',
                followUpExams: [
                    { date: '2024-04-15', finding: 'Kontrol dışkı muayenesinde parazit tespit edilmedi' }
                ],
                notes: 'Rutin parazit kontrolü',
                preventiveMeasures: 'Periyodik parazit kontrolleri (6 ayda bir)'
            }
        ],

        vaccinations: [
            {
                id: 'VAX001',
                name: 'Şap (FMD)',
                manufacturer: 'Biovac Ltd.',
                batchNumber: 'BV-FMD-2024-03',
                date: '2024-01-15',
                administeredBy: 'Dr. Mehmet Yılmaz',
                location: 'Sol omuz, IM',
                status: 'completed',
                validUntil: '2025-01-15',
                nextScheduledDate: '2025-01-15',
                reactions: [],
                notes: 'Rutin yıllık aşılama'
            },
            {
                id: 'VAX002',
                name: 'Brucella',
                manufacturer: 'Biovac Ltd.',
                batchNumber: 'BV-BRU-2024-01',
                date: '2024-01-15',
                administeredBy: 'Dr. Mehmet Yılmaz',
                location: 'Sağ omuz, SC',
                status: 'completed',
                validUntil: '2026-01-15',
                nextScheduledDate: '2026-01-15',
                reactions: [],
                notes: 'İki yılda bir uygulanan aşı'
            },
            {
                id: 'VAX003',
                name: 'Clostridial (7-yönlü)',
                manufacturer: 'VetGuard Inc.',
                batchNumber: 'VG-CL7-2024-10',
                date: '2024-10-20',
                administeredBy: 'Dr. Ayşe Demir',
                location: 'Sol kalça, SC',
                status: 'scheduled',
                reactions: [],
                notes: 'Yıllık aşılama planına uygun olarak planlandı'
            },
            {
                id: 'VAX004',
                name: 'IBR/BVD',
                manufacturer: 'Immunovet',
                batchNumber: 'IV-IBR-2024-09',
                date: '2024-09-01',
                administeredBy: 'Dr. Ali Can',
                status: 'overdue',
                nextScheduledDate: '2024-10-10',
                reactions: [],
                notes: 'Önceki tarihte yapılamadı, en kısa sürede uygulanması gerekiyor'
            }
        ],

        diseaseHistory: [
            {
                id: 'DH001',
                diseaseName: 'Mastitis',
                diagnosisDate: '2024-08-13',
                recoveryDate: '2024-08-20',
                duration: 7, // gün sayısı
                severity: 'medium',
                causeIfKnown: 'Staphylococcus aureus',
                affectedArea: 'Sol ön meme lobu',
                symptoms: ['Meme lobunda şişlik', 'Kızarıklık', 'Ağrı', 'Sütte pıhtılaşma'],
                treatment: 'Antibiyotik tedavisi ve meme masajı',
                outcome: 'Tam iyileşme, süt üretimi normale döndü',
                complications: [],
                recurrenceRisk: 35, // 0-100 arası yüzdelik değer
                recurrencePrevention: 'Sağım hijyeninin iyileştirilmesi, düzenli meme kontrolü',
                notes: 'Sol ön meme lobunda sorun vardı',
                relatedTreatmentIds: ['PT001']
            },
            {
                id: 'DH002',
                diseaseName: 'Topalık (Laminitis)',
                diagnosisDate: '2024-06-01',
                recoveryDate: '2024-06-20',
                duration: 19,
                severity: 'low',
                causeIfKnown: 'Beyaz çizgi hastalığı',
                affectedArea: 'Sağ arka ayak',
                symptoms: ['Topallama', 'Ayak tabanında hassasiyet', 'Ayak kaldırma'],
                treatment: 'Tırnak kesim ve bandaj',
                outcome: 'İyileşme, normal yürüyüş fonksiyonu',
                complications: [],
                recurrenceRisk: 25,
                recurrencePrevention: 'Düzenli tırnak bakımı, çiftlik zeminlerinin kontrolü',
                notes: 'Sağ arka ayak',
                relatedTreatmentIds: ['PT002']
            },
            {
                id: 'DH003',
                diseaseName: 'Parazit enfestasyonu',
                diagnosisDate: '2024-03-20',
                recoveryDate: '2024-03-30',
                duration: 10,
                severity: 'low',
                causeIfKnown: 'İç parazitler (Ostertagia spp., Cooperia spp.)',
                affectedArea: 'Sindirim sistemi',
                symptoms: ['Tüy kalitesinde bozulma', 'Kilo kaybı', 'Hafif ishal'],
                treatment: 'Anti-paraziter uygulama',
                outcome: 'Tam iyileşme',
                complications: [],
                recurrenceRisk: 15,
                recurrencePrevention: 'Düzenli parazit kontrolleri, mera yönetimi',
                relatedTreatmentIds: ['PT003']
            }
        ],

        medicationUsage: [
            {
                medicationName: 'Antibiyotikler',
                totalUsage: 350,
                unit: 'ml',
                administrationMethods: ['IM enjeksiyon', 'SC enjeksiyon', 'Intramamary'],
                lastUsed: '2024-10-01',
                medicationDetails: [
                    { name: 'Draxxin', activeIngredient: 'Tulathromycin', totalAmount: 125, lastUsed: '2024-10-01' },
                    { name: 'Spectramast LC', activeIngredient: 'Ceftiofur hydrochloride', totalAmount: 150, lastUsed: '2024-08-15' },
                    { name: 'Excede', activeIngredient: 'Ceftiofur crystalline free acid', totalAmount: 75, lastUsed: '2023-11-10' }
                ],
                administrationHistory: [
                    { date: '2024-10-01', medication: 'Draxxin', amount: 25, reason: 'Solunum yolu enfeksiyonu' },
                    { date: '2024-08-15', medication: 'Spectramast LC', amount: 50, reason: 'Mastitis' },
                    { date: '2023-11-10', medication: 'Excede', amount: 75, reason: 'Ayak enfeksiyonu' }
                ],
                effectivenessScore: 85,
                effectivenessNotes: 'Hastalıkların tedavisinde genel olarak etkili olduğu gözlemlendi'
            },
            {
                medicationName: 'Anti-inflamatuarlar',
                totalUsage: 120,
                unit: 'ml',
                administrationMethods: ['IM enjeksiyon', 'IV enjeksiyon'],
                lastUsed: '2024-10-02',
                medicationDetails: [
                    { name: 'Banamine', activeIngredient: 'Flunixin meglumine', totalAmount: 75, lastUsed: '2024-08-15' },
                    { name: 'Meloksikam', activeIngredient: 'Meloxicam', totalAmount: 45, lastUsed: '2024-10-02' }
                ],
                administrationHistory: [
                    { date: '2024-10-02', medication: 'Meloksikam', amount: 15, reason: 'Solunum yolu enfeksiyonu' },
                    { date: '2024-08-15', medication: 'Banamine', amount: 25, reason: 'Mastitis' },
                    { date: '2024-06-05', medication: 'Banamine', amount: 20, reason: 'Topalık' }
                ],
                effectivenessScore: 90,
                effectivenessNotes: 'Ağrı ve yangıyı hızla hafiflettiği gözlemlendi'
            },
            {
                medicationName: 'Vitamin kompleksleri',
                totalUsage: 2,
                unit: 'kg',
                administrationMethods: ['Oral', 'Yem katkısı'],
                lastUsed: '2024-09-25',
                medicationDetails: [
                    { name: 'Multivitamin premix', activeIngredient: 'Vit A, D3, E, B kompleksi', totalAmount: 1.5, lastUsed: '2024-09-25' },
                    { name: 'Vitamin C', activeIngredient: 'Ascorbic acid', totalAmount: 0.5, lastUsed: '2024-10-03' }
                ],
                administrationHistory: [
                    { date: '2024-09-25', medication: 'Multivitamin premix', amount: 0.5, reason: 'Genel sağlık desteği' },
                    { date: '2024-03-25', medication: 'Multivitamin premix', amount: 0.5, reason: 'Parazit tedavisi sonrası destek' },
                    { date: '2023-12-15', medication: 'Multivitamin premix', amount: 0.5, reason: 'Kış bakımı desteği' }
                ],
                effectivenessScore: 70,
                effectivenessNotes: 'Genel sağlık ve kondisyonda olumlu etki gözlendi'
            },
            {
                medicationName: 'Parazit ilaçları',
                totalUsage: 75,
                unit: 'ml',
                administrationMethods: ['SC enjeksiyon', 'Pour-on'],
                lastUsed: '2024-03-22',
                medicationDetails: [
                    { name: 'Ivermectin', activeIngredient: 'Ivermectin', totalAmount: 45, lastUsed: '2024-03-22' },
                    { name: 'Dectomax', activeIngredient: 'Doramectin', totalAmount: 30, lastUsed: '2023-09-15' }
                ],
                administrationHistory: [
                    { date: '2024-03-22', medication: 'Ivermectin', amount: 15, reason: 'İç ve dış parazit kontrolü' },
                    { date: '2023-09-15', medication: 'Dectomax', amount: 15, reason: 'Mevsimsel parazit kontrolü' },
                    { date: '2023-03-10', medication: 'Ivermectin', amount: 15, reason: 'Rutin parazit kontrolü' }
                ],
                effectivenessScore: 95,
                effectivenessNotes: 'Parazitlere karşı son derece etkili, hiçbir nüks gözlenmedi'
            }
        ],

        nutritionalSupplements: [
            {
                name: 'Mineral blok',
                type: 'Yalama taşı',
                composition: 'Na, Cl, Ca, P, Mg, Fe, Cu, Zn, Mn, Se, I, Co',
                amount: 'Ad libitum',
                startDate: '2024-01-01',
                lastReplaced: '2024-09-15',
                frequency: 'Sürekli',
                purpose: 'Temel mineral desteği',
                observedEffects: 'Genel kondisyonda olumlu etki'
            },
            {
                name: 'Rumen buffer',
                type: 'Toz',
                composition: 'Sodyum bikarbonat, Magnezyum oksit',
                amount: '50gr/gün',
                startDate: '2024-08-10',
                endDate: '2024-09-10',
                frequency: 'Günlük',
                purpose: 'Rumen pH dengelemesi',
                observedEffects: 'Sindirim sisteminde iyileşme'
            }
        ]
    },

    // Kamera Analizi için mock veriler (yeni)
    cameraAnalysis: {
        feedingDuration: {
            status: "Aktif",
            estimatedDuration: "5.2 saat/gün",
            reliability: 85, // yüzde olarak güvenilirlik
            lastUpdated: "2024-10-04T15:30:22Z",
            trend: "increasing", // increasing, decreasing, stable
            history: [
                { date: "2024-10-03", duration: 4.9 },
                { date: "2024-10-02", duration: 4.8 },
                { date: "2024-10-01", duration: 4.7 },
                { date: "2024-09-30", duration: 5.0 },
                { date: "2024-09-29", duration: 4.8 }
            ],
            note: "Normal aralıkta seyrediyor, son günlerde hafif artış gözlemlendi."
        },
        maternalBehavior: {
            status: "İyi",
            careScore: 85, // 0-100 arası skor
            reliability: 90,
            lastUpdated: "2024-10-04T14:45:10Z",
            observations: [
                {
                    date: "2024-10-04",
                    time: "08:15",
                    behavior: "Emzirme",
                    duration: 45, // dakika
                    note: "Normal süre ve sıklıkta emzirme davranışı."
                },
                {
                    date: "2024-10-04",
                    time: "12:30",
                    behavior: "Yalama/Temizleme",
                    duration: 15,
                    note: "Anne düzenli olarak yavruyu temizliyor."
                },
                {
                    date: "2024-10-04",
                    time: "16:20",
                    behavior: "Koruma",
                    duration: 120,
                    note: "Anne diğer hayvanlardan yavruyu korudu."
                }
            ],
            note: "Anne-yavru bağı güçlü, normal bakım davranışları sergiliyor."
        },
        birthDetection: {
            status: "Aktif İzleme",
            pregnancyStatus: "Gebe",
            estimatedBirthDate: "2024-11-15",
            remainingDays: 42,
            warningLevel: "low", // low, medium, high
            birthSigns: [
                {
                    date: "2024-10-04",
                    time: "14:00",
                    sign: "Normal hareket",
                    severity: "low"
                }
            ],
            previousBirthData: {
                date: "2023-05-20",
                duration: 3.5, // saat
                complications: [],
                outcome: "Başarılı"
            },
            preparationStatus: {
                nestingBehavior: false,
                restlessness: false,
                decreasedAppetite: false,
                isolationSeeking: false
            },
            note: "Henüz doğum belirtisi göstermiyor, normal gebelik süreci devam ediyor."
        },
        socialAnalysis: {
            status: "Analiz Tamamlandı",
            reliability: 80,
            lastUpdated: "2024-10-04T16:00:00Z",
            hierarchyPosition: "Yüksek",
            groupBelonging: "Ana Sürü",
            socialInteractions: {
                friendly: 82, // yüzde
                neutral: 15,
                aggressive: 3
            },
            detailedAnalysis: [
                {
                    date: "2024-10-04",
                    interactionType: "Sosyal Oyun",
                    partners: ["TR123456788", "TR123456790"],
                    duration: 25, // dakika
                    note: "Pozitif etkileşim gözlemlendi."
                },
                {
                    date: "2024-10-04",
                    interactionType: "Birlikte Beslenme",
                    partners: ["TR123456788", "TR123456787", "TR123456790"],
                    duration: 45,
                    note: "Grup halinde sakin beslenme davranışı."
                }
            ],
            behaviouralPatterns: [
                "Lider rolü üstlenme eğilimi",
                "Diğer hayvanlarla pozitif ilişkiler kurma",
                "Kalabalık ortamlarda sakinliğini koruma"
            ],
            note: "Sürü içinde uyumlu ve sosyal bir davranış paterni sergiliyor."
        },
        cameraAvailability: {
            feedingArea: {
                status: "Online",
                lastCheck: "2024-10-04T16:15:00Z",
                resolution: "1080p",
                coverage: "Tam"
            },
            restingArea: {
                status: "Online",
                lastCheck: "2024-10-04T16:15:00Z",
                resolution: "1080p",
                coverage: "Kısmi"
            },
            birthingArea: {
                status: "Online",
                lastCheck: "2024-10-04T16:15:00Z",
                resolution: "1080p",
                coverage: "Tam"
            },
            mainField: {
                status: "Online",
                lastCheck: "2024-10-04T16:15:00Z",
                resolution: "720p",
                coverage: "Kısmi"
            }
        }
    }
};

export default animalDetailMocks; 