import React from 'react';

const CardLabelText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ fontSize: '12px', color: '#1B1B1B', fontWeight: 400 }}>
      {text}
    </div>
  );
};

export default CardLabelText;
