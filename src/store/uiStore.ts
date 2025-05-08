import { create } from 'zustand';

type UIState = {
  isMobileDevice: boolean;
  isMobileSidebarOpen: boolean;
  checkMobileDevice: () => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
};

// Mobil cihaz kontrolü
const checkIfMobile = () => window.innerWidth < 768;

export const useUIStore = create<UIState>((set) => ({
  // Mobil cihaz mı kontrolü
  isMobileDevice: checkIfMobile(),
  
  // Mobil sidebar durumu (sadece mobil cihazlarda kullanılacak)
  isMobileSidebarOpen: false,
  
  // Ekran boyutu değiştiğinde mobil cihaz kontrolü yapacak fonksiyon
  checkMobileDevice: () => {
    const isMobile = checkIfMobile();
    set({ isMobileDevice: isMobile });
  },
  
  // Sadece mobil cihazlarda sidebar'ı açıp kapatmak için
  toggleMobileSidebar: () => set((state) => ({ 
    isMobileSidebarOpen: !state.isMobileSidebarOpen 
  })),
  
  // Mobil sidebar durumunu doğrudan ayarlamak için
  setMobileSidebarOpen: (isOpen) => set({ 
    isMobileSidebarOpen: isOpen 
  }),
})); 