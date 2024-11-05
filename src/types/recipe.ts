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

export type RecipesResponse = {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}; 