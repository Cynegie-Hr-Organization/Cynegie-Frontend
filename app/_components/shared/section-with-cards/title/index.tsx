import React from 'react';

const Title: React.FC<{ text: string; size?: 'small' | 'large' }> = ({
  text,
  size = 'small',
}) => {
  return (
    <div className={size === 'small' ? 'card-title-small' : 'card-title-large'}>
      {text}
    </div>
  );
};

export default Title;
