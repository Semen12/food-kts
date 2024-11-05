import * as React from 'react'
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({className, view, tag = 'div', weight, children, color, maxLines}) => {
    const Tag = tag;
    const textClass = classNames(styles.text, className);
    
    return (
        <Tag 
            className={textClass} 
            data-view={view} 
            data-weight={weight} 
            data-color={color} 
            data-max-lines={maxLines}
        >
            {children}
        </Tag>
    )
};

export default Text;
