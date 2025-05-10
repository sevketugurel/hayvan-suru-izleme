import type { Alert } from "../mocks";
import { alerts } from "../mocks";
import { animals } from "../mocks";

export const getAlerts = (): Promise<Alert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Ensure alert data has correct animal names from the animal data
      const updatedAlerts = alerts.map(alert => {
        const animal = animals.find(a => a.id === alert.animalId);
        if (animal) {
          return {
            ...alert,
            animalName: animal.name
          };
        }
        return alert;
      });

      resolve(updatedAlerts);
    }, 500);
  });
};

export const getAlertById = (id: string): Promise<Alert | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alert = alerts.find(a => a.id === id);
      if (alert) {
        const animal = animals.find(a => a.id === alert.animalId);
        if (animal) {
          resolve({
            ...alert,
            animalName: animal.name
          });
          return;
        }
      }
      resolve(alert);
    }, 300);
  });
};

export const getAlertsByAnimalId = (animalId: string): Promise<Alert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredAlerts = alerts.filter(a => a.animalId === animalId);
      const animal = animals.find(a => a.id === animalId);
      
      if (animal) {
        const updatedAlerts = filteredAlerts.map(alert => ({
          ...alert,
          animalName: animal.name
        }));
        resolve(updatedAlerts);
      } else {
        resolve(filteredAlerts);
      }
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
        
        // Update with the correct animal name
        const animal = animals.find(a => a.id === updatedAlert.animalId);
        if (animal) {
          resolve({
            ...updatedAlert,
            animalName: animal.name
          });
          return;
        }
        
        resolve(updatedAlert);
      } else {
        resolve(undefined);
      }
    }, 300);
  });
}; 