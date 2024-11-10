import axiosInstance from '../config/axios';
import { RecipesResponse } from '../types/recipe';

export const getRecipes = async (page: number = 1, pageSize: number = 9) => {
  const offset = (page - 1) * pageSize;
  
  try {
    const { data } = await axiosInstance.get<RecipesResponse>('/recipes/complexSearch', {
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        offset,
        number: pageSize,
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