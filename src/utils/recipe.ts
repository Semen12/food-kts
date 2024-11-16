import { Recipe } from "@types/recipe";

export const getRecipeSubtitle = (recipe: Recipe): string => {
    return recipe.nutrition?.ingredients?.map((i) => i.name).join(' + ') || 'No ingredients';
  };
  
  export const getRecipeKcal = (recipe: Recipe): string => {
    return `${Math.round(recipe.nutrition?.nutrients[0]?.amount ?? 0)} kcal`;
  };