import React from 'react';

const DeleteIcon: React.FC<{ 
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  onClick?: () => void;
}> = ({ className, width = 24, height = 24, color = "currentColor", onClick }) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 24 24"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path
      fill={color}
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </svg>
);

export default DeleteIcon; 