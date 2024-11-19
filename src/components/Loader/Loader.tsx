import React from 'react';
import SizeL from './assets/SizeL.svg';
import SizeM from './assets/SizeM.svg';
import SizeS from './assets/SizeS.svg';

export type LoaderProps = {
  size?: 's' | 'm' | 'l';
  className?: string;
  fill?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  return (
    <>
      {size === 'l' && (
        <SizeL className={className}/>
      )}
      {size === 'm' && (
       <SizeM className={className}/>
      )}
      {size === 's' && (
       <SizeS className={className}/>
      )}
    </>
  );
};

export default Loader;
