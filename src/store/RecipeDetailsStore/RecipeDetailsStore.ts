import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { getRecipeById } from '@services/recipesService';
import  IRecipeDetail  from '@store/types';
import { RecipeDetails } from '@types/recipe';
import { Meta } from '../types';

type PrivateFields = '_recipe' | '_meta';

class RecipeDetailsStore {
  private _recipe: RecipeDetails | null = null;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RecipeDetailsStore, PrivateFields>(this, {
      _recipe: observable,
      _meta: observable,
      recipe: computed,
      meta: computed,
      getRecipeDetails: action
    });
  }
  get recipe(): RecipeDetails | null {
    return this._recipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRecipeDetails(id: number): Promise<void> {
    this._meta = Meta.loading;
    try {
      const response = await getRecipeById(id);
      console.log(response.data);
      runInAction(() => {
        if (response) {
          this._recipe = response;
          this._meta = Meta.success;
        }
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error;
      });
      console.error('Ошибка при загрузке рецепта:', error);
    }
  }
}

export default RecipeDetailsStore;
