import { getGridLayout } from '@/utils/grid-layout';
import { Grid2 } from '@mui/material';
import React from 'react';
import ButtonGroup from '../button-group';
import { FormProps } from './types';
import InputField from './input-field';

const Form: React.FC<FormProps> = (props) => {
  const {
    title,
    inputFields,
    isCard,
    gridSpacing,
    layout,
    buttonGroup,
    gridItemSize,
  } = props;
  return (
    <div>
      {title && <div className='card-title-small mb-8'>{title}</div>}
      <div className='flex flex-col gap-7'>
        <div
          className={isCard ? 'common-card' : ''}
          style={{ padding: isCard ? '40px' : '' }}
        >
          <Grid2 container spacing={gridSpacing}>
            {inputFields?.map((field, index) => (
              <Grid2
                key={index}
                size={gridItemSize ?? getGridLayout(index, layout)}
              >
                <InputField {...field} />
              </Grid2>
            ))}
          </Grid2>
        </div>
        {buttonGroup && <ButtonGroup {...buttonGroup} />}
      </div>
    </div>
  );
};

export default Form;
