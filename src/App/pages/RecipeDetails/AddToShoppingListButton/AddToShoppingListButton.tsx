import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import shoppingListStore from '@store/ShoppingListStore/ShoppingListStore';
import { Ingredient } from '@types/recipe';
import styles from './AddToShoppingListButton.module.scss';



const AddToShoppingListButton = observer(({ id, name, amount, unit, image }: Ingredient) => {
  const isAdded =  shoppingListStore.items.some(item => item.id === id);
  const handleClick = () => {
    if (isAdded) {
      shoppingListStore.removeItem(id, unit);
    } else {
      shoppingListStore.addItem({ id, name, amount, unit, image });
    }
  }
  return (
    <button 
      className={`${styles.addButton} ${isAdded ? styles.added : ''}`} 
      onClick={handleClick}
    >
      +
    </button>
  );
});

export default AddToShoppingListButton;