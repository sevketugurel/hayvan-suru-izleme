import { useState, useEffect } from 'react';

/**
 * Local storage'a veri kaydetmek ve okumak için bir React hook'u
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State'in ilk değerini localStorage'dan veya initial value'dan al
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // useState'in setter fonksiyonuna benzer bir fonksiyon döndür, localStorage'ı da günceller
  const setValue = (value: T) => {
    try {
      // value bir fonksiyon olabilir, bu tür durumlarda useState gibi ele al
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // State'i güncelle
      setStoredValue(valueToStore);
      // localStorage'ı güncelle
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  // Key değiştiğinde localstorage'ı dinle
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    // Storage event listener ekle
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage; 