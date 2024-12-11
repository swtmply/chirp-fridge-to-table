import { Recipe } from "@/components/recipe-list";

const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

export const getfilteredRecipes = async ({
  dietRestricions,
  ingredients,
  mealType,
}: {
  dietRestricions: string[];
  mealType: string[];
  ingredients: string[];
}) => {
  if (
    dietRestricions.length === 0 &&
    mealType.length === 0 &&
    ingredients.length === 0
  ) {
    return [];
  }

  const parsedIngredients = ingredients
    .map((ingredient) => encodeURIComponent(ingredient))
    .join(",+");
  const parsedDietRestrictions = dietRestricions
    .map((restriction) => encodeURIComponent(restriction))
    .join(",+");
  const parsedMealType = mealType
    .map((type) => encodeURIComponent(type))
    .join(",+");

  const recipes = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${parsedDietRestrictions}&type=${parsedMealType}&number=10&addRecipeInformation=true&sort=max-used-ingredients&includeIngredients=${parsedIngredients}&fillIngredients=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return recipes.results as Recipe[];
};

export const getRecipeInformation = async (id: string) => {
  const recipe = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return recipe as Recipe;
};
