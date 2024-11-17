/* export interface IRecipesStore {
  getRecipesList(page: number): Promise<void>;
}
export interface IRecipeDetail {
  getRecipeById(id: number): Promise<void>;
} */

export enum Meta {
  initial = 'initial',
  loading = 'loading',
  error = 'error',
  success = 'success'
} 