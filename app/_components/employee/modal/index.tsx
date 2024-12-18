import { Checkbox, Dialog, DialogContent, Stack } from '@mui/material';
import React from 'react';
import Heading from '../../shared/page/heading';
import { ModalProps } from './types';
import Button from '@/app/_components/shared/button-group/button';
import Image from 'next/image';
import Form from '@/app/_components/shared/form';
import DetailGroup from '@/app/_components/shared/detail-group';
import PayrollSlip from '../pages/payroll/payroll-slip';
import ButtonGroup from '../../shared/button-group';
import ViewTask from '../pages/task/view-task';
import { icon } from '@/constants';

const dialogStyle = {
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    maxWidth: '950px',
  },
};

const Modal: React.FC<ModalProps> = (props) => {
  const {
    open,
    onClose,
    title,
    subtitle,
    buttonOne,
    buttonTwo,
    centerButton,
    hasHeading = true,
    centerImage,
    centerTitle,
    centerMessage,
    reduceVerticalGap = false,
    detailGroup,
    form,
    isPayrollSlip = false,
    buttonGroupPosition = 'center',
    viewTaskProps,
    hasDocSelect,
  } = props;

  return (
    <Dialog sx={{ ...dialogStyle }} open={open} onClose={onClose}>
      <DialogContent sx={{ overflowX: isPayrollSlip ? 'hidden' : 'auto' }}>
        {isPayrollSlip ? (
          <PayrollSlip />
        ) : (
          <Stack gap={reduceVerticalGap ? 2 : 4} padding={3}>
            {hasHeading && (
              <Heading
                title={title}
                subtitle={subtitle}
                type='modal'
                onCloseClick={onClose}
              />
            )}
            {viewTaskProps && <ViewTask {...viewTaskProps} />}
            {centerImage && (
              <div className='flex justify-center'>
                <Image src={centerImage} width={100} height={100} alt='' />
              </div>
            )}
            {centerTitle && (
              <div className='flex justify-center text-center'>
                <p className=' card-title-large'>{centerTitle}</p>
              </div>
            )}
            {centerMessage && (
              <div className='flex justify-center text-center'>
                <p className=' card-subtitle-small'>{centerMessage}</p>
              </div>
            )}
            {detailGroup && <DetailGroup {...detailGroup} />}
            {hasDocSelect && (
              <div className='flex justify-center gap-10'>
                {[
                  { name: 'PDF', icon: icon.pdf },
                  { name: 'Excel', icon: icon.excel },
                ].map((doc) => (
                  <div key={doc.name} className='flex items-center gap-1'>
                    <Checkbox />
                    <Image src={doc.icon} width={20} height={20} alt='' />
                    <div className='text-[#475367] text-[14px] font-bold'>
                      {doc.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {form && <Form {...form} />}
            {!buttonTwo && (
              <div className={`flex ${centerButton && 'justify-center'}`}>
                <Button {...buttonOne} />
              </div>
            )}
          </Stack>
        )}
        {buttonOne && buttonTwo && (
          <div className='mt-5 mb-3'>
            <ButtonGroup
              leftButton={buttonOne}
              rightButton={buttonTwo}
              position={buttonGroupPosition}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
