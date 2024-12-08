import { Stack } from '@mui/material';
import React from 'react';
import { PageHeadingProps } from './types';
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
          <Stack direction='row' gap={3}>
            {props.leftButton && <Button {...props.leftButton} />}
            {props.rightButton && <Button {...props.rightButton} />}
          </Stack>
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
