import { Badge } from "@/components/ui/badge";
import { getRecipeInformation } from "@/lib/queries/recipes";
import Image from "next/image";
import React from "react";

const RecipePage = async ({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) => {
  const recipeId = (await params).recipeId;

  const recipe = await getRecipeInformation(recipeId);

  return (
    <div className="flex flex-col md:px-16 px-8 py-12 gap-6">
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={512}
        height={512}
        className="rounded-xl"
      />
      <h1 className="font-bold text-2xl">{recipe.title}</h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-black uppercase tracking-wide text-slate-700">
          Diets
        </p>
        <ul className="flex gap-2 flex-wrap">
          {recipe.diets.map((diet) => (
            <Badge key={diet}>{diet}</Badge>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-black uppercase tracking-wide text-slate-700">
          Meal Type
        </p>
        <ul className="flex gap-2 flex-wrap">
          {recipe.dishTypes.map((mealType) => (
            <Badge key={mealType}>{mealType}</Badge>
          ))}
        </ul>
      </div>
      <p
        className="leading-loose"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
    </div>
  );
};

export default RecipePage;
