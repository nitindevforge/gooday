import { create } from "zustand";

export type BottomTabbarStore = {
  bottomVarVariant: "rounded" | "square";
  changeVariant: (bottomVarVariant: "rounded" | "square") => void;
};

const useStore = create<BottomTabbarStore>()((set) => ({
  bottomVarVariant: "rounded",
  changeVariant: (variant) => set(() => ({ bottomVarVariant: variant })),
}));

export const useBottomVarVariant = () => {
  const { bottomVarVariant, changeVariant } = useStore();

  return { bottomVarVariant, changeVariant };
};
