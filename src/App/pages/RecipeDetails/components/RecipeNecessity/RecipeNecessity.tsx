import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './RecipeNecessity.module.scss';
import { Ingredient, Step } from '@types/recipe';


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
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
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