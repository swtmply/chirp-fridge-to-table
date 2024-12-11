import { create } from "zustand";

type DietRestriction = string;
type MealType = string;

interface FilterState {
  dietRestrictions: DietRestriction[];
  mealTypes: MealType[];
  addDietRestriction: (restriction: DietRestriction) => void;
  removeDietRestriction: (restriction: DietRestriction) => void;
  addMealType: (mealType: MealType) => void;
  removeMealType: (mealType: MealType) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  dietRestrictions: [],
  mealTypes: [],

  addDietRestriction: (restriction) =>
    set((state) => ({
      dietRestrictions: state.dietRestrictions.includes(restriction)
        ? state.dietRestrictions
        : [...state.dietRestrictions, restriction],
    })),

  removeDietRestriction: (restriction) =>
    set((state) => ({
      dietRestrictions: state.dietRestrictions.filter((r) => r !== restriction),
    })),

  addMealType: (mealType) =>
    set((state) => ({
      mealTypes: state.mealTypes.includes(mealType)
        ? state.mealTypes
        : [...state.mealTypes, mealType],
    })),

  removeMealType: (mealType) =>
    set((state) => ({
      mealTypes: state.mealTypes.filter((m) => m !== mealType),
    })),

  clearFilters: () =>
    set({
      dietRestrictions: [],
      mealTypes: [],
    }),
}));
