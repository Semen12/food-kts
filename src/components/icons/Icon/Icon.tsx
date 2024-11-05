import * as React from 'react'
import styles from './Icon.module.scss'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent'; 
width?: number;
    height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({color,
    width = 24,
    height = 24,
    className,
    children,
    ...props}) => {
      const colorClass = styles[`icon_${color}`];
        return(
            <svg
            width={width}
            height={height}
           
            className={`${colorClass} ${className || ''} `}
            xmlns="http://www.w3.org/2000/svg"
            viewBox='0 0 24 24'
           /*  fillRule='evenodd' */
            {...props}
          >
            {children}
          </svg>
        )
    }

export default Icon;
