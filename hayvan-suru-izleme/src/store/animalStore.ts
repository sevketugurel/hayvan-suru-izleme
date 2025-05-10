import { create } from 'zustand';
import type { Animal } from '../mocks';
import { getAnimals, getAnimalById, updateAnimalLocation, addAnimal } from '../services';

interface AnimalState {
  animals: Animal[];
  selectedAnimal: Animal | null;
  loading: boolean;
  error: string | null;
  fetchAnimals: () => Promise<void>;
  fetchAnimalById: (id: string) => Promise<void>;
  updateLocation: (id: string, location: string) => Promise<void>;
  addAnimal: (animalData: Omit<Animal, 'id'>) => Promise<void>;
}

export const useAnimalStore = create<AnimalState>((set) => ({
  animals: [],
  selectedAnimal: null,
  loading: false,
  error: null,

  fetchAnimals: async () => {
    set({ loading: true, error: null });
    try {
      const animals = await getAnimals();
      set({ animals, loading: false });
    } catch (error) {
      set({ error: 'Hayvanlar yüklenirken bir hata oluştu', loading: false });
    }
  },

  fetchAnimalById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const animal = await getAnimalById(id);
      if (animal) {
        set({ selectedAnimal: animal, loading: false });
      } else {
        set({ error: 'Hayvan bulunamadı', loading: false });
      }
    } catch (error) {
      set({ error: 'Hayvan detayları yüklenirken bir hata oluştu', loading: false });
    }
  },

  updateLocation: async (id: string, location: string) => {
    set({ loading: true, error: null });
    try {
      const updatedAnimal = await updateAnimalLocation(id, location);
      if (updatedAnimal) {
        set((state) => ({
          animals: state.animals.map(a => a.id === id ? updatedAnimal : a),
          selectedAnimal: state.selectedAnimal?.id === id ? updatedAnimal : state.selectedAnimal,
          loading: false
        }));
      } else {
        set({ error: 'Hayvan bulunamadı', loading: false });
      }
    } catch (error) {
      set({ error: 'Konum güncellenirken bir hata oluştu', loading: false });
    }
  },

  addAnimal: async (animalData: Omit<Animal, 'id'>) => {
    set({ loading: true, error: null });
    try {
      const newAnimal = await addAnimal(animalData);
      set((state) => ({
        animals: [...state.animals, newAnimal],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Yeni hayvan eklenirken bir hata oluştu', loading: false });
    }
  }
})); 