import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { Recipe } from '@types/recipe';
import { getRecipes } from '@services/recipesService';

import { Meta, IRecipesStore } from '../types';

type PrivateFields = '_recipes' | '_meta';

class RecipesStore  {
  private _recipes: Recipe[] = [];
  private _meta: Meta = Meta.initial;
  

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _recipes: observable,
      _meta: observable,
      recipes: computed,
      meta: computed,
      getRecipesList: action
    });
  }
  
   
  get recipes(): Recipe[] {
    return this._recipes;
  }

 

  get meta(): Meta {
    return this._meta;
  }

  async getRecipesList(page: number): Promise<void> {
    this._meta = Meta.loading;
    try {
      const response = await getRecipes(page);
      runInAction(() => {
        if (response?.results) {
          this._recipes = response.results;
          this._meta = Meta.success;
        }
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
      console.error('Ошибка при загрузке рецептов:', error);
    }
  }

}

export default RecipesStore;
