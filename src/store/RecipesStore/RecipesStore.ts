import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { Recipe } from '@types/recipe';
import { getRecipes } from '@services/recipesService';

import { Meta, IRecipesStore } from '../types';

type PrivateFields = '_recipes' | '_meta' | '_searchQuery';

interface GetRecipesParams {
  page: number;
  query?: string;
  types?: string[];
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
      setSearchQuery: action,
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

  setSearchQuery(query: string) {
    this._searchQuery = query;
  }

  async getRecipesList(params: GetRecipesParams): Promise<void> {
    this._meta = Meta.loading;
    try {
      const response = await getRecipes(params);
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
    }
  }

}

export default RecipesStore;
