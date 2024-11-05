interface Recipe {
  id: number;
  title: string;
  readyInMinutes: number;
  calories: number;
  image: string;
  extendedIngredients: {
    name: string;
  }[];
}

interface RecipesResponse {
  results: Recipe[];
  totalResults: number;
} 