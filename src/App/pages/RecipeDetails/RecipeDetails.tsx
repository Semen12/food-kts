import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ArrowRound from '@assets/arrow-round.svg?react';
import Loader from '@components/Loader';
import RecipeDetailsStore from '@store/RecipeDetailsStore/RecipeDetailsStore';
import { Meta } from '@store/types';
import styles from './RecipeDetails.module.scss';
import React from 'react';
import LoaderContainer  from '../components/LoaderContainer/LoaderContainer';

const RecipeDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const recipeDetailsStore = useLocalStore(() => new RecipeDetailsStore());

  useEffect(() => {
    if (id) {
      recipeDetailsStore.getRecipeDetails(Number(id));
    }
  }, [id, recipeDetailsStore]);

 

 /*  console.log(recipeDetailsStore.recipe.nutrition?.ingredients[0].name); */
  return (
    <React.Fragment> 
      {recipeDetailsStore.meta === Meta.loading && <LoaderContainer />}
      {recipeDetailsStore.meta === Meta.success && (
    <div className={styles.recipe}>
      <div className={styles.recipe__container}>
        <div className={styles.recipe__top}>
          <h1 className={styles.recipe__title}>
            {recipeDetailsStore.recipe?.title}{' '}
            <NavLink to="/recipes">
              <ArrowRound />
            </NavLink>
          </h1>
          <img src={recipeDetailsStore.recipe.image} alt={recipeDetailsStore.recipe.title} className={styles.recipe__image} />
          <div className={styles.recipe__info}>
            <div className={styles.recipe__infoItem}>
              <span>Preparation</span>
              <span>{recipeDetailsStore.recipe.preparationMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Cooking</span>
              <span>{recipeDetailsStore.recipe.cookingMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Total</span>
              <span>{recipeDetailsStore.recipe.readyInMinutes} minutes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Ratings</span>
              <span>{recipeDetailsStore.recipe.aggregateLikes} likes</span>
            </div>
            <div className={styles.recipe__infoItem}>
              <span>Servings</span>
              <span>{recipeDetailsStore.recipe.servings} servings</span>
            </div>
          </div>
          <div className={styles.recipe__summary} dangerouslySetInnerHTML={{ __html: recipeDetailsStore.recipe.summary }} />
        </div>
        <div className={styles.recipe__necessity}>
          <div className={styles.recipe__section}>
            <h2>Ingredients</h2>
            <ul>
              {recipeDetailsStore.recipe?.extendedIngredients?.map((ingredient: {name: string; amount: number; unit: string}, index: number) => (
                <li key={index}>
                   {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.recipe__section}>
            <h2>Equipment</h2>
            <ul>
              {recipeDetailsStore.recipe.analyzedInstructions[0]?.steps.map((step) => (
                <li key={step.number}>{step.equipment.map((item) => item.name).join(', ')}</li>
              ))}
            </ul>
          </div>
          <div className={styles['recipe__section-steps']}>
            <h2>Directions</h2>
            {recipeDetailsStore.recipe.analyzedInstructions[0]?.steps.map((step) => (
              <div key={step.number} className={styles['recipe__section-step']}>
                <h3>Step {step.number}</h3>
                <p>{step.step}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
      )}
    </React.Fragment>
  );
});

export default RecipeDetails;
