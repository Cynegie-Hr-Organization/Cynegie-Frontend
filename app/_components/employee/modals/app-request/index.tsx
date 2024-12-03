'use client';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Stack } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const AppRequestModal: React.FC<{
  open: boolean;
  onCloseFn: () => void;
}> = ({ open, onCloseFn }) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  return (
    <>
      <Dialog
        open={open}
        onClose={onCloseFn}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '12px',
            minWidth: '650px',
          },
        }}
      >
        <DialogContent>
          <Stack gap={4} padding={3}>
            <Stack direction='row' alignItems='center'>
              <Stack flexGrow={1} gap={1}>
                <div className='card-title-large'>App Request</div>
                <div className='card-subtitle-small'>
                  Fill in the details below to request App
                </div>
              </Stack>
              <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
            </Stack>
            <Stack gap={4}>
              {[
                {
                  label: 'App Name',
                  placeholder: 'Figma',
                },
                {
                  label: 'Reason',
                  placeholder: 'Clear description of why you are returning it',
                },
              ].map((item, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        color: '#101928',
                        fontWeight: 600,
                        fontSize: '14px',
                        whiteSpace: 'no-wrap',
                      }}
                    >
                      {item.label}
                    </div>
                    {
                      <Input
                        placeholder={item.placeholder}
                        key={index}
                        style={{ borderRadius: '6px' }}
                        //   disabled={index == 0 ? true : false}
                      />
                    }
                  </div>
                </div>
              ))}
            </Stack>
            <Stack
              direction='row'
              justifyContent={'center'}
              gap={2}
              alignItems='center'
            >
              <button
                onClick={onCloseFn}
                style={{
                  borderRadius: '8px',
                  border: '1.5px solid #D0D5DD',
                  color: '#667185',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '10px 0px',
                  width: '250px',
                  backgroundColor: '#FFF',
                  marginTop: '10px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onCloseFn();
                  setShowSuccessDialog(true);
                }}
                style={{
                  borderRadius: '8px',
                  // border: '2px solid #0035C3',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '10px 0px',
                  width: '250px',
                  backgroundColor: '#0035C3',
                  marginTop: '10px',
                }}
              >
                Request App
              </button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      {showSuccessDialog && (
        <Dialog
          open={showSuccessDialog}
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: '20px',
            },
          }}
        >
          <DialogContent>
            <Stack gap={3} alignItems='center' padding={3}>
              <Image
                src='/icons/success-tick.svg'
                alt=''
                height={100}
                width={100}
              />
              <div
                style={{ fontWeight: 600, fontSize: '20px', color: '#303030' }}
              >
                App Requested
              </div>
              <div>Your request has been sent successfully</div>
              <button
                onClick={() => {
                  setShowSuccessDialog(false);
                }}
                style={{
                  borderRadius: '8px',
                  border: '1.5px solid #98A2B3',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '10px 80px',
                  //   width: '250px',
                  backgroundColor: '#0035C3',
                  marginTop: '10px',
                }}
              >
                Return to App Dashboard
              </button>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AppRequestModal;
