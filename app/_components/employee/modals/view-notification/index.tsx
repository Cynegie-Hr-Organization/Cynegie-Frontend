import DeleteIcon from '@/app/_components/icons/delete';
import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, Grid2, Stack } from '@mui/material';
import { CalendarIcon } from 'lucide-react';
import React from 'react';

const ViewNotificationModal: React.FC<{
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
          //   minWidth: { xs: '100%', md: '650px' },
        },
        // px: '30px',
        zIndex: 1000,
      }}
    >
      <DialogContent>
        <Stack gap={4} padding={3}>
          <Stack direction='row' alignItems='center'>
            <Stack flexGrow={1} gap={1}>
              <div className='card-title-large'>Notification</div>
            </Stack>
            <Close sx={{ cursor: 'pointer' }} onClick={onCloseFn} />
          </Stack>
          <Grid2 container spacing={4}>
            {[
              { label: 'Notification', details: 'Request for Time off' },
              { label: 'From', details: 'Charleson Udor' },
              { label: 'Date', details: '30 July 2024' },
              {
                label: 'Details',
                details: `Analytics delivers actionable, industry-ready initiatives each time a business complete their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed imperdiet dignissim ipsum quam.`,
              },
            ].map((item, index) => (
              <Grid2 key={index} size={{ xs: 12 }}>
                <Stack gap={1}>
                  <div
                    style={{
                      color: index == 3 ? '#000' : '#9CA3AF',
                      fontWeight: index == 3 ? 700 : 400,
                      fontSize: '14px',
                    }}
                  >
                    {item.label}
                  </div>
                  {index == 2 ? (
                    <Stack
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        padding: '5px',
                        width: 'fit-content',
                      }}
                      direction='row'
                      alignItems='center'
                      gap={1}
                    >
                      <CalendarIcon width={20} />
                      <div>30 July 2024</div>
                    </Stack>
                  ) : (
                    <div
                      style={{
                        color: index == 3 ? '#64748B' : '#303030',
                        fontWeight: index == 3 ? 400 : 700,
                        fontSize: '14px',
                      }}
                    >
                      <pre
                        style={{ fontFamily: 'Open Sans', textWrap: 'wrap' }}
                      >
                        {item.details}
                      </pre>
                    </div>
                  )}
                </Stack>
              </Grid2>
            ))}
          </Grid2>
          <Stack direction='row' alignItems='center' gap={1}>
            <DeleteIcon />
            <div style={{ color: '#D42620' }}>Delete Notification</div>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ViewNotificationModal;
