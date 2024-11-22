import { Stack, Switch, TextField } from '@mui/material';

const ProratedPaymentDropdownSettings = () => {
  return (
    <Stack gap={2}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            color: '#101928',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Proration Rules
        </div>
        <TextField
          sx={{
            fontSize: '14px',
            '& .MuiInputBase-root': {
              height: '35px',
              // border: '1px solid #D0D5DD',
            },
          }}
          placeholder='Enter proration rule'
        />
      </div>
      <Stack direction='row' alignItems='center'>
        <div
          style={{
            flexGrow: 1,
            fontSize: '14px',
            fontWeight: 600,
            color: '#101928',
          }}
        >
          Enable Proration
        </div>
        <Switch />
      </Stack>
    </Stack>
  );
};

export default ProratedPaymentDropdownSettings;
