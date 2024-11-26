import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import shoppingListStore from '@store/ShoppingListStore/ShoppingListStore';
import styles from './ShoppingListModal.module.scss';
import DeleteIcon from '@components/icons/DeleteIcon';
import Button from '@components/Button';

interface ShoppingListModalProps {
  onClose: () => void;
}

const SPOONACULAR_IMAGE_URL = 'https://spoonacular.com/cdn/ingredients_100x100/';

export const ShoppingListModal = observer(({ onClose }: ShoppingListModalProps) => {
  React.useEffect(() => {
    // Блокируем прокрутку при монтировании
    document.body.style.overflow = 'hidden';
    
    // Разблокируем при размонтировании
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Shopping List</h2>
          <button className={styles.closeButton} onClick={onClose}><DeleteIcon /></button>
        </div>

        <div className={styles.modalContent}>
          {shoppingListStore.items.length === 0 ? (
            <p className={styles.emptyMessage}>Shopping list is empty</p>
          ) : (
            <>
              <div className={styles.items}>
                {shoppingListStore.items.map((item) => (
                  <div key={`${item.id}-${item.unit}`} className={styles.item}>
                    <div className={styles.itemInfo}>
                      <img 
                        src={`${SPOONACULAR_IMAGE_URL}${item.image}`}
                        alt={item.name}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemDetails}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemAmount}>
                          {`${item.amount} ${item.unit}`}
                        </span>
                      </div>
                    </div>
                    <Button
                  
                      className={styles.removeButton}
                      onClick={() => shoppingListStore.removeItem(item.id, item.unit)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                className={styles.clearButton}
                onClick={() => shoppingListStore.clearList()}
              >
                Clear list
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}); 