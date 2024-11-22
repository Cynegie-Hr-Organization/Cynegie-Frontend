import { MenuItem, Select, Stack, Switch, TextField } from '@mui/material';

const PayrollApprovalDropdownSettings = () => {
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
          Approval Levels
        </div>
        <Select
          defaultValue='Level 1'
          sx={{
            height: '35px',
            borderRadius: '4.62px',
            pr: '15px',
          }}
        >
          <MenuItem value='Level 1'>Level 1</MenuItem>
        </Select>
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
          Notify Approvers
        </div>
        <Switch />
      </Stack>
    </Stack>
  );
};

export default PayrollApprovalDropdownSettings;
