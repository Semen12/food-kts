import { makeObservable, observable, action, computed, reaction } from 'mobx';
import { Ingredient } from '@types/recipe';

const STORAGE_KEY = 'shopping-list';

type PrivateFields = '_items';

class ShoppingListStore {
  private _items: Ingredient[] = [];

  constructor() {
    makeObservable<ShoppingListStore, PrivateFields>(this, {
      _items: observable,
      items: computed,
      addItem: action,
      removeItem: action,
      clearList: action,
    });

    // Инициализация стора
    this.initializeStore();

    // Автоматическое сохранение при изменениях
    reaction(
      () => this.items,
      (items) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      },
    );
  }

  private initializeStore(): void {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        this._items = JSON.parse(savedItems);
      }
    } catch (error) {
      console.error('Ошибка при загрузке списка покупок:', error);
      this._items = [];
    }
  }

  get items(): Ingredient[] {
    return this._items;
  }

  addItem(item: Ingredient): void {
    const existingItem = this._items.find((i) => i.id === item.id && i.unit === item.unit);

    if (existingItem) {
      existingItem.amount += item.amount;
    } else {
      this._items.push({ ...item }); // Создаем копию объекта
    }
  }

  removeItem(id: number, unit: string): void {
    this._items = this._items.filter((item) => !(item.id === id && item.unit === unit));
  }

  clearList(): void {
    this._items = [];
  }

  isItemInList(id: number, unit: string): boolean {
    return this._items.some((item) => item.id === id && item.unit === unit);
  }
}

export default new ShoppingListStore();
