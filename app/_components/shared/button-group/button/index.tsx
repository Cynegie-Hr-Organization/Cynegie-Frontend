import React from 'react';
import { ChevronDown } from 'lucide-react';
import { color, icon } from '@/constants';
import { ButtonProps, ButtonType } from '../../page/heading/types';
import { PopoverType } from '@/app/_components/shared/custom-popover/types';
import SvgIcon from '../../../icons/container';
import Popover from '../../custom-popover';

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    text,
    icon: iconProp,
    onClick,
    popoverOptions,
    fullWidth,
    small,
  } = props;

  const borderStyle = { border: '1.5px solid' };
  const paddingStyle = { padding: '10px 24px' };
  const fontSizeStyle = { fontSize: '16px' };
  const fontWeightStyle = { fontWeight: 700 };
  const borderRadiusStyle = { borderRadius: '8px' };

  const containedStyle = {
    ...color.button.contained,
    ...paddingStyle,
    ...fontSizeStyle,
    ...fontWeightStyle,
    ...borderRadiusStyle,
  };

  const outlinedStyle = {
    ...color.button.outlined,
    ...borderStyle,
    ...paddingStyle,
    ...fontSizeStyle,
    ...fontWeightStyle,
    ...borderRadiusStyle,
  };

  const filterStyle = {
    ...color.button.filter,
    ...borderStyle,
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
  };

  const outlinedBlueStyle = {
    ...outlinedStyle,
    borderColor: color.info.dark,
    color: color.info.dark,
    borderWidth: '2px',
  };

  const deleteContainedStyle = {
    ...containedStyle,
    backgroundColor: color.error.dark,
  };

  const blackStyle = {
    ...containedStyle,
    backgroundColor: 'black',
  };

  const deleteWithIconStyle = {
    ...containedStyle,
    backgroundColor: 'white',
    border: 0,
    color: color.error.dark,
    display: 'flex',
    gap: 10,
    paddingLeft: 0,
    fontWeight: 400,
  };

  const disabledStyle = {
    ...outlinedStyle,
    ...color.button.disabled,
    fontWeight: 600,
  };

  const deleteIconOnly = type === ButtonType.deleteWithIcon && !text;

  const button = (
    <button
      onClick={onClick}
      style={{
        ...(type === ButtonType.outlined && outlinedStyle),
        ...(type === ButtonType.contained && containedStyle),
        ...(type === ButtonType.filter && filterStyle),
        ...(type === ButtonType.outlinedBlue && outlinedBlueStyle),
        ...(type === ButtonType.deleteContained && deleteContainedStyle),
        ...(type === ButtonType.deleteWithIcon && deleteWithIconStyle),
        ...(type === ButtonType.disabled && disabledStyle),
        ...(type === ButtonType.black && blackStyle),
        borderRadius: '8px',
        ...(iconProp && {
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }),
        ...(small && { fontSize: '14px' }),
        textWrap: 'nowrap',
        ...(deleteIconOnly && { padding: 0 }),
      }}
      className={`w-fit sm:${fullWidth ? 'w-full' : 'w-fit'}`}
    >
      {iconProp}
      {type === ButtonType.deleteWithIcon && (
        <SvgIcon path={icon.bin} width={20} height={20} />
      )}
      {text}
      {popoverOptions && (
        <ChevronDown style={{ display: 'inline', marginLeft: 5 }} />
      )}
    </button>
  );

  return popoverOptions ? (
    <Popover
      type={PopoverType.moreOptions}
      triggerButton={button}
      moreOptions={popoverOptions}
    />
  ) : (
    button
  );
};

export default Button;
