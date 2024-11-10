import classNames from 'classnames';
import React from 'react';
import Text from '../Text';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string,
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot, }) => {
    const handleClick = (e: React.MouseEvent) => {
      // Проверяем, что клик не был по кнопке "Сохранить"
      if (!(e.target as HTMLElement).closest(`.${styles.card__action}`)) {
      onClick?.(e);
    }
  };
  const cardClasses = classNames(styles.card, className);
  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Изображение с сохранением пропорций */}
      <div className={styles.card__imageContainer}>
        <img src={image} alt="" className={styles.card__image} />
      </div>
      <div className={styles.card__wrapper}>
        {/* Слот над заголовком (опциональный) */}
       

        {/* Заголовок и описание */}
        <div className={styles.card__content}> 
          {captionSlot && <Text className={styles.card__content_caption} view="p-14" color="secondary" weight="medium" tag="div">{captionSlot}</Text>}
          <Text className={styles.card__content_title} tag="h3" view="p-20" weight="medium" maxLines={2}>
            {title}
          </Text>
          <Text className={styles.card__content_subtitle} view="p-14" color="secondary" weight="medium" tag="div" maxLines={3}>
            {subtitle}
          </Text>
          
        </div>
        <div className={styles.card__actions}>
          {/* Футер или боковая часть */}
          {contentSlot && <div className={styles.card__footer}>{contentSlot}</div>}

          {/* Слот для действия (опциональный) */}
          {actionSlot && <div className={styles.card__action}>{actionSlot}</div>}
        </div>

      </div>

    </div>
  )
};

export default Card;
