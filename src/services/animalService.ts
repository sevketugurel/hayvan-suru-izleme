import type { Animal } from "../mocks";
import { animals } from "../mocks";

export const getAnimals = (): Promise<Animal[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(animals);
    }, 500);
  });
};

export const getAnimalById = (id: string): Promise<Animal | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const animal = animals.find(a => a.id === id);
      resolve(animal);
    }, 300);
  });
};

export const updateAnimalLocation = (id: string, location: string): Promise<Animal | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const animalIndex = animals.findIndex(a => a.id === id);
      if (animalIndex >= 0) {
        const updatedAnimal = {
          ...animals[animalIndex],
          location,
          lastSeen: new Date().toISOString()
        };
        animals[animalIndex] = updatedAnimal;
        resolve(updatedAnimal);
      } else {
        resolve(undefined);
      }
    }, 300);
  });
}; 