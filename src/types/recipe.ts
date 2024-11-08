export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

export type Recipe = {
  readyInMinutes: number;
  id: number;
  title: string;
  image: string;
  nutrition?: {
    nutrients: Nutrient[];
  };
  extendedIngredients: {
    name: string;
  }[];
};

export type RecipeDetails = {
  title: string;
  image: string;
  readyInMinutes: number;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: string;
  extendedIngredients: Array<{
    original: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
      equipment: Array<{
        name: string;
      }>;
    }>;
  }>;
};

export type RecipesResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}; 