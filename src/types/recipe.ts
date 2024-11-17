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
  extendedIngredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
};

export type RecipesResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}; 

export interface GetRecipesParams {
  page?: number;
  pageSize?: number;
  query?: string;
  type?: string[];
}


export interface GetRecipeById {
  id: number;
}

interface Step {
  number: number;
  step: string;
  equipment: Array<{ name: string }>;
}

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}
