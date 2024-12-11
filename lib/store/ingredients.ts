import { create } from "zustand";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface IngredientStore {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: string) => void;
  updateIngredient: (
    id: string,
    updatedIngredient: Partial<Ingredient>
  ) => void;
  clearIngredients: () => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [],

  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),

  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    })),

  updateIngredient: (id, updatedIngredient) =>
    set((state) => ({
      ingredients: state.ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, ...updatedIngredient }
          : ingredient
      ),
    })),

  clearIngredients: () => set({ ingredients: [] }),
}));
