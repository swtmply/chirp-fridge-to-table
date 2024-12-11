"use client";

import PantryInventory from "@/components/inventory";
import { MultiSelectDropdown } from "@/components/multi-select-dropdown";
import RecipeList from "@/components/recipe-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { dietOptions, mealTypesOptions } from "@/lib/data";
import { useFilterStore } from "@/lib/store/filters";
import { Suspense } from "react";

export default function Home() {
  const {
    addDietRestriction,
    addMealType,
    removeDietRestriction,
    removeMealType,
    dietRestrictions,
    mealTypes,
  } = useFilterStore((state) => state);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-8">
      <PantryInventory />

      <Suspense
        fallback={
          <Card className="w-full max-w-md mt-8">
            <CardHeader>
              <CardTitle>Available Recipes</CardTitle>
            </CardHeader>
            <CardContent className="gap-2 flex flex-col">
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

              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        }
      >
        <RecipeList />
      </Suspense>
    </div>
  );
}
