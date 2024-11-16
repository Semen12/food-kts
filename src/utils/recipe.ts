import { Recipe } from "@types/recipe";

export const getRecipeSubtitle = (recipe: Recipe): string => {
    return recipe.nutrition?.ingredients?.map((i) => i.name).join(' + ') || 'No ingredients';
  };
  
  export const getRecipeKcal = (recipe: Recipe): string => {
    return `${Math.round(recipe.nutrition?.nutrients[0]?.amount ?? 0)} kcal`;
  };

  interface RecipeInfoItem {
    label: string;
    value: string | null;
  }
  
  export const getRecipeInfoItems = (recipe: any): RecipeInfoItem[] => [
    {
      label: 'Preparation',
      value: recipe.preparationMinutes ? `${recipe.preparationMinutes} minutes` : null,
    },
    {
      label: 'Cooking',
      value: recipe.cookingMinutes ? `${recipe.cookingMinutes} minutes` : null,
    },
    {
      label: 'Total',
      value: recipe.readyInMinutes ? `${recipe.readyInMinutes} minutes` : null,
    },
    {
      label: 'Ratings',
      value: recipe.aggregateLikes ? `${recipe.aggregateLikes} likes` : null,
    },
    {
      label: 'Servings',
      value: recipe.servings ? `${recipe.servings} servings` : null,
    },
  ];