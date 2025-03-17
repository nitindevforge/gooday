import { create } from "zustand";

export type LoadingStore = {
  loading: boolean;
  changeLoading: (loading: boolean) => void;
};

const useStore = create<LoadingStore>()((set) => ({
  loading: false,
  changeLoading: (loading) => set(() => ({ loading })),
}));

export const useLoading = () => {
  const { changeLoading, loading } = useStore();
  return { changeLoading, loading };
};
