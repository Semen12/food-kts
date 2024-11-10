export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  nutrition?: {
    nutrients: Nutrient[];
    ingredients: Array<{
      id: number;
      name: string;
      amount: number;
      unit: string;
    }>;
  };
};

export type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  summary: string;
  nutrition?: {
    nutrients: Nutrient[];
    ingredients: Array<{
      id: number;
      name: string;
      amount: number;
      unit: string;
    }>;
  };
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