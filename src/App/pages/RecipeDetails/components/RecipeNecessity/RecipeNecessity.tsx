import AddToShoppingListButton from '../../../components/AddToShoppingListButton';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Ingredient, Step } from '@types/recipe';
import styles from './RecipeNecessity.module.scss';


interface RecipeNecessityProps {
  ingredients: Ingredient[];
  steps: Step[];
}


export const RecipeNecessity = observer(({ ingredients, steps }: RecipeNecessityProps) => (
  <div className={styles.recipe__necessity}>
    <div className={styles.recipe__section}>
      <h2>Ingredients</h2>
      <ul className={styles['recipe__section-ingredients']}>
        {ingredients?.map((ingredient, index) => (
          <li key={index} className={styles['recipe__section-ingredients-name']}>
            <div>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </div>
            <AddToShoppingListButton 
                id={ingredient.id} 
                name={ingredient.name} 
                amount={ingredient.amount} 
                unit={ingredient.unit} 
                image={ingredient.image} />
            
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.recipe__section}>
      {steps.filter(step => step.equipment?.length > 0).length > 0 && (
        <>
          <h2>Equipment</h2>
          <ul className={styles['recipe__section-equipment']}>
            {steps
          .filter(step => step.equipment?.length > 0)
          .map((step) => (
            <li key={step.number}>
              {step.equipment.map((item) => item.name).join(', ')}
            </li>
            ))}
          </ul>
        </>
      )}
    </div>
    <div className={styles['recipe__section-steps']}>
      <h2>Directions</h2>
      {steps.map((step) => (
        <div key={step.number} className={styles['recipe__section-step']}>
          <h3>Step {step.number}</h3>
          <p>{step.step}</p>
        </div>
      ))}
    </div>
  </div>
)); 