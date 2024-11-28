import axiosInstance from '@config/axios';
import { GetRecipesParams } from '@types/recipe';



export const getRecipes = async ({ page = 1, pageSize = 9, query, type }: GetRecipesParams = {}) => {
  const offset = (page - 1) * pageSize;
  
  try {
    const { data } = await axiosInstance.get<GetRecipesParams>('/recipes/complexSearch', {
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        offset,
        number: pageSize,
        query,
        type: type?.join(','),
        addRecipeNutrition: true,
        addRecipeInformation: true,
        instructionsRequired: true
      }
    });
    
    return data;
  } catch (error) {
    console.log('Error fetching recipes:', error);
    return error;
  }
};

export const getRecipeById = async (id:number) => {
  try {
    const { data } = await axiosInstance.get(`/recipes/${id}/information`, {
      params: {
        apiKey: import.meta.env.VITE_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных рецепта:', error);
    return error;
  }
};

export const getrandomRecipe = async () => {
  try {
    const { data } = await axiosInstance.get<GetRecipesParams>('/recipes/random', {
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        number: 1 // получаем только 1 случайный рецепт
      }
    });
    console.log('data', data.recipes[0]    );
    return data; // API возвращает массив recipes
  } catch (error) {
    console.error('Ошибка при получении случайного рецепта:', error);
    return error;
  }
};

