import axiosInstance from '@config/axios';
import { IRawRecipesResponse } from '@utils/types';


interface GetRecipesParams {
  page?: number;
  pageSize?: number;
  query?: string;
  types?: string[];
}

export const getRecipes = async ({ page = 1, pageSize = 9, query, types }: GetRecipesParams = {}) => {
  const offset = (page - 1) * pageSize;
  
  try {
    const { data } = await axiosInstance.get<GetRecipesParams & IRawRecipesResponse>('/recipes/complexSearch', {
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        offset,
        number: pageSize,
        query,
        types: types?.join(','),
        addRecipeNutrition: true,
        addRecipeInformation: true,
        instructionsRequired: true
      }
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

export const getRecipeById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/recipes/${id}/information`, {
      params: {
        apiKey: import.meta.env.VITE_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных рецепта:', error);
 
  }
}; 