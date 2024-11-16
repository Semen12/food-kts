import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { getRecipeById } from '@services/recipesService';
import { Meta } from '@store/types';
import { Recipe, RecipeDetails } from '@types/recipe';


type PrivateFields = '_recipe' | '_meta';

class RecipeDetailsStore {
  [x: string]: any;
  private _recipe: RecipeDetails & Recipe = null;
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
  get recipe(): RecipeDetails & Recipe  {
    return this._recipe;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getRecipeDetails(id: number): Promise<void> {
    if (this._meta === Meta.loading) {
      return;
    }
    this._meta = Meta.loading;
    const response = await getRecipeById(id);
    console.log(response);
    runInAction(() => {
      if (response) {
        this._recipe = response;
        this._meta = Meta.success;
      } else {
        this._meta = Meta.error;
      }
    });
  }

  get steps() {
    return this.recipe?.analyzedInstructions[0]?.steps || [];
  }
}

export default RecipeDetailsStore;
