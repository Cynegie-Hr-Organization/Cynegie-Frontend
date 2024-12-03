import React from 'react';
import { ChevronDown } from 'lucide-react';
import MoreOptionsPopover from '@/app/_components/shared/popover';
import { color } from '@/constants';
import { OutlinedButtonProps } from '../../types';

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  text,
  onClick,
  popoverOptions,
}) => {
  const button = (
    <button
      onClick={onClick}
      style={{
        ...color.button.outlined,
        fontWeight: 700,
        fontSize: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '10px 24px',
        border: `1.5px solid`,
      }}
    >
      {text}
      {popoverOptions && (
        <ChevronDown style={{ display: 'inline', marginLeft: 5 }} />
      )}
    </button>
  );

  return popoverOptions ? (
    <MoreOptionsPopover triggerButton={button} options={popoverOptions} />
  ) : (
    button
  );
};

export default OutlinedButton;
