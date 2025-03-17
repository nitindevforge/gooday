import { create } from "zustand";

export type VenueFilterStore = {
  filter: {
    available_today: boolean;
    distance: string;
    people: number;
    price: string;
  };
  updateFilter: (data: Partial<VenueFilterStore["filter"]>) => void;
  resetFilter: () => void;
};

export const filterInitialValues = {
  available_today: false,
  distance: "",
  people: 1,
  price: "",
};

const useStore = create<VenueFilterStore>()((set) => ({
  filter: filterInitialValues,
  updateFilter: (data) =>
    set((state) => ({
      ...state,
      filter: JSON.parse(JSON.stringify({ ...state.filter, ...data })),
    })),
  resetFilter: () =>
    set((state) => ({ ...state, filter: filterInitialValues })),
}));

export const useVenueFilter = () => {
  const { filter, resetFilter, updateFilter } = useStore();
  return { filter, resetFilter, updateFilter };
};
