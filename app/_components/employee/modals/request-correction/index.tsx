import CalendarIcon from '@/app/_components/icons/calendar';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Grid2, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { DatePicker, DateRangePicker, Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const RequestCorrectionModal: React.FC<{
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
            minWidth: '800px',
          },
        }}
      >
        <DialogContent>
          <Stack gap={4} padding={3}>
            <Stack direction='row' alignItems='center'>
              <Stack flexGrow={1} gap={1}>
                <div className='card-title-large'>Request Maintenance</div>
                <div className='card-subtitle-small'>
                  Fill in the details below to request device maintenance
                </div>
              </Stack>
              <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
            </Stack>
            <Grid2 spacing={2} container>
              {[
                { label: 'Date', placeholder: 'Enter' },
                { label: 'Correct Clock In Time', placeholder: 'Select Time' },
                { label: 'Correct Clock Out Time', placeholder: 'Select Time' },
              ].map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 5,
                    }}
                  >
                    <div
                      style={{
                        color: '#101928',
                        fontWeight: 600,
                        fontSize: '14px',
                      }}
                    >
                      {item.label}
                    </div>
                    {index == 0 ? (
                      <Input
                        placeholder={item.placeholder}
                        key={index}
                        style={{ borderRadius: '6px' }}
                      />
                    ) : index == 1 ? (
                      <DateRangePicker
                        style={{
                          borderRadius: '6px',
                        }}
                        preventOverflow
                        showOneCalendar
                        cleanable={false}
                        ranges={[]}
                        format='dd MMM yyyy'
                        placeholder={item.placeholder}
                        character=' – '
                        caretAs={CalendarIcon}
                      />
                    ) : (
                      <DatePicker
                        key={index}
                        placeholder={item.placeholder}
                        style={{
                          borderRadius: '6px',
                        }}
                        format='dd MMM yyyy'
                        cleanable={false}
                        caretAs={CalendarIcon}
                      />
                    )}
                  </div>
                </Grid2>
              ))}
            </Grid2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <div
                style={{
                  color: '#101928',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                Reason for Correction
              </div>
              <TextField multiline minRows={4} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <div
                style={{
                  color: '#101928',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                Attachments
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px',
                  border: '1px dashed #9CA3AF',
                  borderRadius: '5px',
                  width: '300px',
                }}
              >
                <div
                  style={{
                    color: '#9CA3AF',
                    fontWeight: 400,
                    fontSize: '14px',
                  }}
                >
                  Upload File
                </div>
              </div>
              <div
                style={{ color: '#303030', fontWeight: 400, fontSize: '10px' }}
              >
                Attach any relevant file. Max file size allowed is 2MB
              </div>
            </div>
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
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '10px 0px',
                  width: '250px',
                  backgroundColor: '#0035C3',
                  marginTop: '10px',
                }}
              >
                Submit Request
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
                style={{
                  fontWeight: 600,
                  fontSize: '20px',
                  color: '#303030',
                  textAlign: 'center',
                }}
              >
                Your request for correction has been submitted successfully
              </div>
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
                Continue to Dashboard
              </button>
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RequestCorrectionModal;
