import React from 'react';
import { ButtonType, PageHeadingProps } from './types';
import Button from '../../button-group/button';
import { Close } from '@mui/icons-material';
import HeadingBack from './back';

const PageHeading: React.FC<PageHeadingProps> = (props) => {
  return (
    <div>
      {props.backText && (
        <div
          onClick={props.onBackTextClick}
          className={`${props.text ? 'mb-6' : 'mb-[-10]'}`}
        >
          <HeadingBack text={props.backText} />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className='flex flex-col gap-1 flex-grow'>
          <div
            className={
              props.type === 'modal' || props.smallHeading
                ? 'card-title-large'
                : 'section-heading'
            }
          >
            {props.text}
          </div>
          {props.subtitle && (
            <div
              className={
                props.type === 'modal'
                  ? 'card-subtitle-small'
                  : 'section-subtitle'
              }
            >
              {props.subtitle}
            </div>
          )}
        </div>
        {props.hasButtons && (
          <div className='hidden md:flex gap-5'>
            {props.leftButton && <Button {...props.leftButton} />}
            {props.rightButton && <Button {...props.rightButton} />}
          </div>
        )}
        {props.smActions && (
          <div className='block md:hidden'>
            <Button
              text='Actions'
              type={ButtonType.outlined}
              popoverOptions={props.smActions}
            />
          </div>
        )}
        {props.rightButtonSm && props.rightButton && (
          <div className='block md:hidden ml-3'>
            <Button small={props.rightButtonSm} {...props.rightButton} />
          </div>
        )}
        {props.type === 'modal' && (
          <Close
            sx={{ cursor: 'pointer' }}
            onClick={() => props.onCloseClick?.(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PageHeading;
