import { Grid2, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const GeneralDropdownSettings = () => {
  return (
    <Grid2 spacing={2} container>
      {[
        { label: 'Pay Period Setup', placeholder: 'Select Date' },
        { label: 'Pay Date', placeholder: 'Select Type' },
      ].map((item, index) => (
        <Grid2 key={index} size={{ xs: 12, md: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
              <Select
                defaultValue={item.placeholder}
                sx={{
                  height: '35px',
                  borderRadius: '4.62px',
                  pr: '15px',
                }}
              >
                <MenuItem value={item.placeholder}>{item.placeholder}</MenuItem>
              </Select>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    fontSize: '14px',
                    '& .MuiInputBase-root': {
                      height: '35px',
                      // border: '1px solid #D0D5DD',
                    },
                  }}
                  slotProps={{
                    textField: { placeholder: item.placeholder },
                  }}
                />
              </LocalizationProvider>
            )}
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GeneralDropdownSettings;
