import { color } from '@/constants';
import React from 'react';
import { ContainedButtonProps } from '../../types';

const ContainedButton: React.FC<ContainedButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...color.button.contained,
        fontWeight: 700,
        fontSize: '16px',
        borderRadius: '8px',
        padding: '10px 24px',
      }}
    >
      {text}
    </button>
  );
};

export default ContainedButton;
