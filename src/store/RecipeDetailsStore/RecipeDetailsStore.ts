import { makeObservable, observable, computed, action, runInAction, get } from 'mobx';
import { getRecipeById , getrandomRecipe } from '@services/recipesService';
import { Meta } from '@store/types';
import { Recipe, RecipeDetails } from '@types/recipe';


type PrivateFields = '_recipe' | '_meta' | '_errorMessage' | '_randomRecipe';

class RecipeDetailsStore {
 
  private _recipe: RecipeDetails & Recipe | null = null;
  private _meta: Meta = Meta.initial;
  private _errorMessage: string = '';
  private _randomRecipe: RecipeDetails & Recipe | null = null;
  constructor() {
    makeObservable<RecipeDetailsStore, PrivateFields>(this, {
      _recipe: observable,
      _meta: observable,
      _errorMessage: observable,
      _randomRecipe: observable,
      recipe: computed,
      randomRecipe: computed,
      meta: computed,
      steps: computed,
      errorMessage: computed,
      getRecipeDetails: action,
      getRandomRecipe: action
    });
  }
  get recipe(): RecipeDetails & Recipe | null {
    return this._recipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  async getRecipeDetails(id: number): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;
    this._errorMessage = '';
    
      const response = await getRecipeById(id);
      console.log(response?.title);
      runInAction(() => {
        if (response?.title) {
          this._recipe = response;
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
          this._errorMessage = response?.response?.data?.message || 'Не удалось получить рецепт';
          console.log(this._errorMessage);
        }
      });
   
  }

  async getRandomRecipe(): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;
    this._errorMessage = '';

    const response = await getrandomRecipe();
    
    runInAction(() => {
      if (response?.recipes?.[0]) {
        this._meta = Meta.success;
        this._randomRecipe = response.recipes[0];
      } else {
        this._meta = Meta.error;
        this._errorMessage = response?.response?.data?.message || 'Произошла ошибка';
        this._randomRecipe = null;
      }
    });
  }

  get steps() {
    return this.recipe?.analyzedInstructions[0]?.steps || [];
  }

  get randomRecipe() {
    return this._randomRecipe;
  }
}

export default RecipeDetailsStore;
