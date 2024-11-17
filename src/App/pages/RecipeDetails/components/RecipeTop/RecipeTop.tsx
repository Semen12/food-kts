import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import ArrowRound from '@assets/arrow-round.svg?react';
import styles from './RecipeTop.module.scss';
import parse from 'html-react-parser';

interface RecipeTopProps {
  title: string;
  image: string;
  summary: string;
  recipeInfo: Array<{ label: string; value: string }>;
}

export const RecipeTop = observer(({ title, image, summary, recipeInfo }: RecipeTopProps) => (
  <div className={styles.recipe__top}>
    <h1 className={styles.recipe__title}>
      {title} <NavLink to="/recipes"><ArrowRound /></NavLink>
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
)); 