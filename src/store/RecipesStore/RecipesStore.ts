import { AxiosResponse } from 'axios';
import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { getRecipes } from '@services/recipesService';
import { Recipe } from '@types/recipe';

import { Meta, IRecipesStore } from '../types';

type PrivateFields = '_recipes' | '_meta' | '_searchQuery';

interface GetRecipesParams {
  page: number;
  query?: string;
  type?: string[];
}

class RecipesStore  {
  private _recipes: Recipe[] = [];
  private _meta: Meta = Meta.initial;
  private _searchQuery: string = '';
  

  constructor() {
    makeObservable<RecipesStore, PrivateFields>(this, {
      _recipes: observable,
      _meta: observable,
      _searchQuery: observable,
      recipes: computed,
      meta: computed,
      searchQuery: computed,
      
      getRecipesList: action
    });
  }
  
   
  get recipes(): Recipe[] {
    return this._recipes;
  }

 

  get meta(): Meta {
    return this._meta;
  }

  get searchQuery(): string {
    return this._searchQuery;
  }

 

  async getRecipesList(params: GetRecipesParams): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;

      const response= await getRecipes(params);
      runInAction(() => {
        if (response?.results) {
          this._recipes = response.results;
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
    });
  }
}

export default RecipesStore;
