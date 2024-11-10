import React from 'react';
import LoaderL from './assets/Size=l.svg?react';
import LoaderM from './assets/Size=m.svg?react';
import LoaderS from './assets/Size=s.svg?react';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
  fill?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  return (
    <>
      {size === 'l' && (
        <LoaderL className={className}/>
      )}
      {size === 'm' && (
       <LoaderM className={className}/>
      )}
      {size === 's' && (
       <LoaderS className={className}/>
      )}
    </>
  );
};

export default Loader;
