import { Stack } from '@mui/material';
import React from 'react';
import OutlinedButton from './buttons/outlined';
import ContainedButton from './buttons/contained';
import { PageHeadingProps } from './types';

const PageHeading: React.FC<PageHeadingProps> = (props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexGrow: 1 }}>
        <div className='section-heading'>{props.text}</div>
        {props.subtitle && (
          <div className='section-subtitle'>{props.subtitle}</div>
        )}
      </div>
      {props.hasButtons && (
        <Stack direction='row' gap={3}>
          {props.outlinedButton && <OutlinedButton {...props.outlinedButton} />}
          {props.containedButton && (
            <ContainedButton {...props.containedButton} />
          )}
        </Stack>
      )}
    </div>
  );
};

export default PageHeading;
