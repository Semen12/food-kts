import { makeAutoObservable } from 'mobx';
import { Recipe } from '../types';

class FavoriteRecipesStore {
  favorites: Recipe[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('favoriteRecipes');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('favoriteRecipes', JSON.stringify(this.favorites));
  }

  toggleFavorite(recipe: Recipe) {
    const index = this.favorites.findIndex(item => item.id === recipe.id);
    if (index === -1) {
      this.favorites.push(recipe);
    } else {
      this.favorites.splice(index, 1);
    }
    this.saveToLocalStorage();
  }

  isFavorite(recipeId: number) {
    return this.favorites.some(recipe => recipe.id === recipeId);
  }

  get favoritesCount() {
    return this.favorites.length;
  }
}

export default FavoriteRecipesStore; 