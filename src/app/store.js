import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const defaultQuote = {
  businessName: 'QuoteRotor Media',
  accentColor: '#0f172a',
  logoDataUrl: '',
  clientName: '',
  clientCompany: '',
  clientEmail: '',
  projectTitle: 'Drone Photo + Video Estimate',
  deliverables: '20 edited aerial photos\n60-second branded video',
  shootingFee: 350,
  editingFee: 150,
  licensingFee: 75,
  addonsFee: 0,
  revisionFee: 50,
  travelMode: 'mileage',
  travelMiles: 20,
  customTravelFee: 0,
  notes:
    'This estimate includes one site visit and one revision round. Weather rescheduling included once at no charge.',
  validDays: 14,
}

const defaultProfitCheck = {
  totalQuote: 300,
  travelHours: 1.5,
  onSiteHours: 1,
  editHours: 2,
  taxRate: 25,
}

export const useAppStore = create(
  persist(
    (set) => ({
      premiumUnlocked: false,
      quote: defaultQuote,
      profitCheck: defaultProfitCheck,

      setPremiumUnlocked: (value) => set({ premiumUnlocked: value }),

      updateQuote: (patch) =>
        set((state) => ({
          quote: { ...state.quote, ...patch },
        })),

      updateProfitCheck: (patch) =>
        set((state) => ({
          profitCheck: { ...state.profitCheck, ...patch },
        })),

      resetQuote: () => set({ quote: defaultQuote }),
      resetProfitCheck: () => set({ profitCheck: defaultProfitCheck }),
    }),
    {
      name: 'quoterotor-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        premiumUnlocked: state.premiumUnlocked,
        quote: state.quote,
        profitCheck: state.profitCheck,
      }),
    }
  )
)