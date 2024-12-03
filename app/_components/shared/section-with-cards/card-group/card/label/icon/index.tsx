import { ColorVariant } from '@/types';
import { getColorVariant } from '@/utils';
import React from 'react';

const CardLabelIcon: React.FC<{
  icon: React.ReactElement;
  colorVariant?: ColorVariant;
  containerHeight: number;
  containerWidth: number;
}> = ({ icon, colorVariant, containerHeight, containerWidth }) => {
  return (
    <div
      style={{
        ...getColorVariant(colorVariant),
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `${containerHeight}px`,
        width: `${containerWidth}px`,
      }}
    >
      {icon}
    </div>
  );
};

export default CardLabelIcon;
