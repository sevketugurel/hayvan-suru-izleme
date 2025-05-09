import { create } from 'zustand';
import type { Alert } from '../mocks';
import { getAlerts, getAlertsByAnimalId, markAlertAsRead } from '../services';

interface AlertState {
  alerts: Alert[];
  filteredAlerts: Alert[];
  loading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
  fetchAlertsByAnimalId: (animalId: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  filteredAlerts: [],
  loading: false,
  error: null,

  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const alerts = await getAlerts();
      set({ alerts, loading: false });
    } catch (error) {
      set({ error: 'Uyarılar yüklenirken bir hata oluştu', loading: false });
    }
  },

  fetchAlertsByAnimalId: async (animalId: string) => {
    set({ loading: true, error: null });
    try {
      const filteredAlerts = await getAlertsByAnimalId(animalId);
      set({ filteredAlerts, loading: false });
    } catch (error) {
      set({ error: 'Hayvanın uyarıları yüklenirken bir hata oluştu', loading: false });
    }
  },

  markAsRead: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const updatedAlert = await markAlertAsRead(id);
      if (updatedAlert) {
        set((state) => ({
          alerts: state.alerts.map(a => a.id === id ? updatedAlert : a),
          filteredAlerts: state.filteredAlerts.map(a => a.id === id ? updatedAlert : a),
          loading: false
        }));
      } else {
        set({ error: 'Uyarı bulunamadı', loading: false });
      }
    } catch (error) {
      set({ error: 'Uyarı güncellenirken bir hata oluştu', loading: false });
    }
  }
})); 