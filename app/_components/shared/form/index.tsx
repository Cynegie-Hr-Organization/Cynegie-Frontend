import React from 'react';
import { Grid2, TextField } from '@mui/material';
import SelectField from '../../employee/input-fields/select';
import RadioField from '../../employee/input-fields/radio-group';
import CustomDatePicker from '../../ui/date-picker';
import CustomTimePicker from '../../ui/time-picker';
import DragUpload from '../drag-upload';
import FieldLabel from '../detail-group/detail/value';
import { FormProps } from './types';
import { getGridLayout } from '@/utils/grid-layout';
import ButtonGroup from '../button-group';

const Form: React.FC<FormProps> = (props) => {
  const { inputFields, isCard, gridSpacing, layout, buttonGroup } = props;
  return (
    <div className='flex flex-col gap-7'>
      <div
        className={isCard ? 'common-card' : ''}
        style={{ padding: isCard ? '40px' : '' }}
      >
        <Grid2 container spacing={gridSpacing}>
          {inputFields?.map((field, index) => (
            <Grid2
              key={field.name}
              size={getGridLayout(index, inputFields.length, layout)}
            >
              <div className='flex flex-col gap-2'>
                <FieldLabel wrapText value={field.name ?? ''} />
                {field.type == 'message' && (
                  <TextField
                    fullWidth
                    placeholder={field.placeholder}
                    multiline
                    minRows={5}
                    value={field.value}
                    onChange={(e) => field.setValue?.(e.target.value)}
                  />
                )}
                {field.type == 'select' && (
                  <SelectField
                    options={field.options}
                    placeholder={field.placeholder}
                    value={field.value}
                    setValue={field.setValue}
                    valueControlledFromOutside={
                      field.selectValControlledFromOutside
                    }
                  />
                )}
                {field.type == 'radio' && (
                  <RadioField key={field.value} options={field.options ?? []} />
                )}
                {field.type == 'date' && <CustomDatePicker removeTopMargin />}
                {field.type == 'time' && <CustomTimePicker />}
                {field.type == 'drag-upload' && <DragUpload />}
              </div>
            </Grid2>
          ))}
        </Grid2>
      </div>
      {buttonGroup && <ButtonGroup {...buttonGroup} />}
    </div>
  );
};

export default Form;
