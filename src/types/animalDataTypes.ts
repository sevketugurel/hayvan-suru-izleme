// Hayvan sensör izleme sistemi için veri tipleri

// Genel hayvan bilgileri için tipler
export interface AnimalGeneralInfoData {
    id: string;
    name: string;
    species: string;
    breed: string;
    gender: 'erkek' | 'dişi';
    weight: number;
    birthDate: string;
}

// Sağlık verileri için tipler
export interface HealthData {
    pulseRate: {
        current: number;
        average: number;
        min: number;
        max: number;
    };
    stressLevel: {
        current: number;
        average: number;
    };
    bodyTemperature: {
        current: number;
        average: number;
        min: number;
        max: number;
    };
    medications: string[];
}

// Tedaviler ve aşılar için tipler
export interface Vaccination {
    id: string;
    name: string;
    manufacturer: string;
    batchNumber: string;
    date: string;
    administeredBy: string;
    location?: string;
    status: "completed" | "scheduled" | "overdue";
    validUntil?: string;
    nextScheduledDate?: string;
    reactions: any[];
    notes: string;
}

export interface PastTreatment {
    id: string;
    date: string;
    endDate: string;
    diagnosis: string;
    diagnosisNotes: string;
    symptoms: string[];
    diagnosticTests: {
        name: string;
        result: string;
        date: string;
    }[];
    treatment: string;
    medications: {
        name: string;
        activeIngredient: string;
        dosage: string;
        method: string;
        frequency: string;
        administeredBy: string;
    }[];
    supportiveCare: string[];
    veterinarian: string;
    result: string;
    resultDetail: string;
    milkWithdrawalPeriod?: {
        startDate: string;
        endDate: string;
        completed: boolean;
    };
    followUpExams: {
        date: string;
        finding: string;
    }[];
    notes: string;
    preventiveMeasures?: string;
}

export interface ActiveTreatment {
    id: string;
    startDate: string;
    estimatedEndDate: string;
    diagnosis: string;
    diagnosisNotes: string;
    symptoms: string[];
    treatmentPlan: string;
    responsibleVet: string;
    medicationSchedule: {
        medication: string;
        activeIngredient: string;
        dosage: string;
        frequency: string;
        method: string;
        remainingDoses: number;
        remainingDays: number;
        administeredBy: string;
        administrationDate?: string;
        administrationDates?: string[];
    }[];
    progress: number;
    progressNotes: {
        date: string;
        note: string;
    }[];
    followUpDate: string;
    notes: string;
}

export interface DiseaseHistory {
    id: string;
    diseaseName: string;
    diagnosisDate: string;
    recoveryDate: string;
    duration: number;
    severity: "low" | "medium" | "high";
    causeIfKnown: string;
    affectedArea: string;
    symptoms: string[];
    treatment: string;
    outcome: string;
    complications: string[];
    recurrenceRisk: number;
    recurrencePrevention: string;
    notes?: string;
    relatedTreatmentIds: string[];
}

export interface MedicationUsage {
    medicationName: string;
    totalUsage: number;
    unit: string;
    administrationMethods: string[];
    lastUsed: string;
    medicationDetails: {
        name: string;
        activeIngredient: string;
        totalAmount: number;
        lastUsed: string;
    }[];
    administrationHistory: {
        date: string;
        medication: string;
        amount: number;
        reason: string;
    }[];
    effectivenessScore: number;
    effectivenessNotes: string;
}

export interface TreatmentsData {
    pastTreatments: PastTreatment[];
    activeTreatments: ActiveTreatment[];
    vaccinations: Vaccination[];
    diseaseHistory: DiseaseHistory[];
    medicationUsage: MedicationUsage[];
    nutritionalSupplements?: {
        name: string;
        type: string;
        composition: string;
        amount: string;
        startDate: string;
        lastReplaced?: string;
        frequency: string;
        purpose: string;
        observedEffects: string;
    }[];
}

// Davranış verileri için tipler
export interface BehaviorsData {
    sleepQuality: {
        score: number;
        duration: number;
        deepSleepPercentage: number;
    };
    restingStandingRatio: {
        resting: number;
        standing: number;
        ratio: number;
    };
    ruminationCount: {
        daily: number;
        average: number;
        trend: 'increasing' | 'decreasing' | 'stable';
    };
    stepCount: {
        daily: number;
        average: number;
        trend: 'increasing' | 'decreasing' | 'stable';
    };
    feedingDuration: {
        daily: number;
        average: number;
        trend: 'increasing' | 'decreasing' | 'stable';
    };
}

// Üreme takibi için tipler
export interface ReproductionData {
    heatCycles: {
        lastHeatDate: string;
        nextExpectedHeatDate: string;
        cycleLength: number;
        heatDuration: number;
        history: {
            startDate: string;
            endDate: string;
            intensity: 'low' | 'medium' | 'high';
            notes: string;
        }[];
    };
    birthData: {
        totalBirths: number;
        lastBirthDate: string;
        offspringCount: number;
        averageBirthWeight: number;
        complications: string[];
        history: {
            date: string;
            offspringCount: number;
            complications: string[];
            notes: string;
        }[];
    };
    maternalBehavior: {
        score: number;
        notes: string;
    };
}

// Konum ve sosyal davranışlar için tipler
export interface LocationData {
    currentPosition: {
        latitude: number;
        longitude: number;
        timestamp: string;
        accuracy: number;
    };
    dailyMovement: {
        timestamp: string;
        latitude: number;
        longitude: number;
    }[];
    pastLocations: {
        date: string;
        positions: {
            timestamp: string;
            latitude: number;
            longitude: number;
        }[];
    }[];
}

export interface HerdDeviationData {
    isDeviated: boolean;
    deviationHistory: {
        date: string;
        time: string;
        description: string;
        severity: "low" | "medium" | "high";
        duration: number;
        distance: number;
        action: string;
    }[];
    safeZones: {
        name: string;
        center: {
            latitude: number;
            longitude: number;
        };
        radius: number;
    }[];
    alertSettings: {
        maxDistance: number;
        alertThreshold: number;
    };
}

export interface SocialBehaviorData {
    summary: string;
    socialScore: number;
    dominanceRank: number;
    interactions: {
        type: string;
        frequency: number;
        partners: string[];
        duration: number;
    }[];
    abnormalBehaviors: string[];
}

export interface CloseFriendsData {
    bestFriends: {
        animalId: string;
        animalName: string;
        proximityScore: number;
        dailyInteractionTime: number;
        relationshipDuration: number;
    }[];
    recentChanges: string;
    socialNetworkVisualization?: string;
}

export interface LocationSocialData {
    gpsTracking: LocationData;
    herdDeviation: HerdDeviationData;
    socialBehavior: SocialBehaviorData;
    closeFriends: CloseFriendsData;
}

// Risk ve çevre verileri için tipler
export interface DrownRiskData {
    currentRisk: "low" | "medium" | "high";
    riskHistory: {
        date: string;
        time: string;
        location: string;
        distance: number;
        severity: "low" | "medium" | "high";
        duration: number;
        weatherConditions: string;
    }[];
    dangerZones: {
        name: string;
        type: string;
        center?: { latitude: number; longitude: number };
        radius?: number;
        coordinates?: { latitude: number; longitude: number }[];
        depth: number;
        width?: number;
        flowRate?: string;
        safeDistance: number;
    }[];
    preventiveMeasures: string[];
}

export interface GasLevelsData {
    animalSpecific: {
        lastReading: {
            timestamp: string;
            location: string;
            ammonia: number;
            methane: number;
            carbonDioxide: number;
            humidity: number;
            temperature: number;
        };
        dailyAverage: {
            date: string;
            ammonia: number;
            methane: number;
            carbonDioxide: number;
        };
        weeklyTrend: {
            startDate: string;
            endDate: string;
            ammoniaTrend: "increasing" | "decreasing" | "stable";
            methaneTrend: "increasing" | "decreasing" | "stable";
            carbonDioxideTrend: "increasing" | "decreasing" | "stable";
        };
    };
    facilityLevels: {
        readings: {
            location: string;
            timestamp: string;
            ammonia: number;
            methane: number;
            carbonDioxide: number;
        }[];
        safetyThresholds: {
            ammonia: { warning: number; danger: number };
            methane: { warning: number; danger: number };
            carbonDioxide: { warning: number; danger: number };
        };
        ventilationStatus: string;
        airQualityIndex: number;
    };
    historicalData: {
        date: string;
        ammonia: number;
        methane: number;
        carbonDioxide: number;
    }[];
}

export interface OtherRisksData {
    heatStress: {
        currentLevel: "low" | "medium" | "high";
        temperatureHumidityIndex: number;
        recommendedActions: string[];
    };
    predatorRisk: {
        level: "low" | "medium" | "high";
        recentSightings: {
            date: string;
            predatorType: string;
            location: string;
        }[];
        vulnerabilityScore: number;
    };
}

export interface RiskEnvironmentData {
    drowningRisk: DrownRiskData;
    gasLevels: GasLevelsData;
    otherRisks: OtherRisksData;
}

// Tüm hayvan verilerini kapsayan ana arayüz
export interface AnimalData {
    generalInfo: AnimalGeneralInfoData;
    healthData: HealthData;
    treatments: TreatmentsData;
    behaviors: BehaviorsData;
    reproduction: ReproductionData;
    locationSocial: LocationSocialData;
    riskEnvironment: RiskEnvironmentData;
} 