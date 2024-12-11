"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getfilteredRecipes } from "@/lib/queries/recipes";
import { useIngredientStore } from "@/lib/store/ingredients";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MultiSelectDropdown } from "./multi-select-dropdown";
import { dietOptions, mealTypesOptions } from "@/lib/data";
import { useFilterStore } from "@/lib/store/filters";
import { useRouter } from "next/navigation";

export interface Recipe {
  id: string;
  title: string;
  extendedIngredients: {
    aisle: string;
    nameClean: string;
  };
  summary: string;
  dishTypes: string[];
  diets: string[];
  image: string;
}

export default function RecipeList() {
  const { ingredients } = useIngredientStore((state) => state);
  const {
    addDietRestriction,
    addMealType,
    removeDietRestriction,
    removeMealType,
    dietRestrictions,
    mealTypes,
  } = useFilterStore((state) => state);
  const router = useRouter();

  const { data: recipes } = useSuspenseQuery({
    queryKey: [
      "recipes",
      [...ingredients.map((i) => i.name)],
      mealTypes,
      dietRestrictions,
    ],
    queryFn: () =>
      getfilteredRecipes({
        ingredients: [...ingredients.map((i) => i.name)],
        mealType: mealTypes,
        dietRestricions: dietRestrictions,
      }),
  });

  return (
    <Card className="w-full max-w-md mt-8">
      <CardHeader>
        <CardTitle>Available Recipes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row gap-2">
          <MultiSelectDropdown
            heading="Diet Restrictions"
            options={dietOptions}
            placeholder="Diet Restrictions"
            onRemove={removeDietRestriction}
            onSelect={addDietRestriction}
            selectedValues={dietRestrictions}
          />
          <MultiSelectDropdown
            heading="Meal Type"
            options={mealTypesOptions}
            placeholder="Meal Type"
            onRemove={removeMealType}
            onSelect={addMealType}
            selectedValues={mealTypes}
          />
        </div>

        {recipes.length > 0 ? (
          <ul className="space-y-2">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="bg-secondary p-2 rounded-md">
                <div className="flex justify-between items-center">
                  <span>{recipe.title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      router.push(`/recipes/${recipe.id}`);
                    }}
                  >
                    View Recipe
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            No recipes available with current ingredients.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
