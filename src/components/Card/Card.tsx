import classNames from 'classnames';
import React from 'react';
import Text from '../Text';
import './Card.css';

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
      if (!(e.target as HTMLElement).closest('.card__action')) {
      onClick?.(e);
    }
  };
  const cardClasses = classNames('card', className);
  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Изображение с сохранением пропорций */}
      <div className="card__image-container">
        <img src={image} alt="" className="card__image" />
      </div>
      <div className="card__wrapper">
        {/* Слот над заголовком (опциональный) */}
       

        {/* Заголовок и описание */}
        <div className="card__content"> 
          {captionSlot && <div className="card__caption">{captionSlot}</div>}
          <Text className="card__title" maxLines={2}>
            {title}
          </Text>
          <Text className="card__subtitle" maxLines={3}>
            {subtitle}
          </Text>
          
        </div>
        <div className='card__actions'>
          {/* Футер или боковая часть */}
          {contentSlot && <div className="card__footer">{contentSlot}</div>}

          {/* Слот для действия (опциональный) */}
          {actionSlot && <div className="card__action">{actionSlot}</div>}
        </div>

      </div>

    </div>
  )
};

export default Card;
