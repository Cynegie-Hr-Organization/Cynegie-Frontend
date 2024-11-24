import { Close } from '@mui/icons-material';
import { Checkbox, Dialog, DialogContent, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const DownloadReportModal: React.FC<{
  open: boolean;
  onCloseFn: () => void;
}> = ({ open, onCloseFn }) => {
  return (
    <Dialog
      open={open}
      onClose={onCloseFn}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
        },
      }}
    >
      <DialogContent>
        <Stack gap={2} padding={3}>
          <Stack direction='row' justifyContent='flex-end'>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '18px',
              color: '#101928',
            }}
          >
            Download Report
          </div>
          <div
            style={{
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '14px',
              color: '#667185',
            }}
          >
            Select the format you would like to download your report
          </div>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            gap={3}
          >
            <Stack direction='row' alignItems='center' gap={0.5}>
              <Checkbox />
              <div>
                <Image src='/icons/pdf.svg' width={20} height={20} alt='' />
              </div>
              <div
                style={{ color: '#475367', fontWeight: 600, fontSize: '14px' }}
              >
                PDF
              </div>
            </Stack>
            <Stack direction='row' alignItems='center' gap={0.5}>
              <Checkbox />
              <div>
                <Image src='/icons/excel.svg' width={20} height={20} alt='' />
              </div>
              <div
                style={{ color: '#475367', fontWeight: 600, fontSize: '14px' }}
              >
                Excel
              </div>
            </Stack>
          </Stack>
          <Stack direction='row' gap={5} mt={3} justifyContent='center'>
            <button
              onClick={onCloseFn}
              style={{
                borderRadius: '8px',
                border: '1.5px solid #D0D5DD',
                color: '#667185',
                fontSize: '16px',
                fontWeight: 700,
                padding: '10px 40px',
                backgroundColor: '#FFF',
                marginTop: '10px',
              }}
            >
              Cancel
            </button>
            <button
              style={{
                borderRadius: '8px',
                border: '1.5px solid #98A2B3',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 600,
                padding: '10px 30px',
                backgroundColor: '#0035C3',
                marginTop: '10px',
                display: 'flex',
                gap: 10,
              }}
            >
              <Image src='/icons/download.svg' width={24} height={24} alt='' />
              Download
            </button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadReportModal;
