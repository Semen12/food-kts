import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowRound from '@assets/arrow-round.svg?react';
import styles from './RecipeTop.module.scss';

interface RecipeTopProps {
  title: string;
  image: string;
  summary: string;
  recipeInfo: Array<{ label: string; value: string }>;
}

export const RecipeTop = observer(({ title, image, summary, recipeInfo }: RecipeTopProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
    <div className={styles.recipe__top}>
      <h1 className={styles.recipe__title}>
        {title} 
        <button onClick={handleGoBack} className={styles.backButton}>
          <ArrowRound />
        </button>
      </h1>
      <img src={image} alt={title} className={styles.recipe__image} />
      <div className={styles.recipe__info}>
        {recipeInfo
          .map((item, index) => item.value ? (
            <div key={index} className={styles.recipe__infoItem}>
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
          ) : null)}
      </div>
      <div className={styles.recipe__summary}>
        {parse(summary)}
      </div>
    </div>
    </React.Fragment>
  );
}); 