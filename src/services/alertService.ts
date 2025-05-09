import type { Alert } from "../mocks";
import { alerts } from "../mocks";

export const getAlerts = (): Promise<Alert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alerts);
    }, 500);
  });
};

export const getAlertById = (id: string): Promise<Alert | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alert = alerts.find(a => a.id === id);
      resolve(alert);
    }, 300);
  });
};

export const getAlertsByAnimalId = (animalId: string): Promise<Alert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredAlerts = alerts.filter(a => a.animalId === animalId);
      resolve(filteredAlerts);
    }, 300);
  });
};

export const markAlertAsRead = (id: string): Promise<Alert | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alertIndex = alerts.findIndex(a => a.id === id);
      if (alertIndex >= 0) {
        const updatedAlert = {
          ...alerts[alertIndex],
          isRead: true
        };
        alerts[alertIndex] = updatedAlert;
        resolve(updatedAlert);
      } else {
        resolve(undefined);
      }
    }, 300);
  });
}; 